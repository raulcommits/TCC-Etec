import json
import random
import os
import unicodedata
from datetime import datetime, timedelta, time
from faker import Faker

# ==============================================================================
# CONFIGURAÇÕES E LIMITAÇÕES
# ==============================================================================
QTD_PACIENTES = 1000
QTD_AGENTES = 255

PROB_INATIVIDADE_PACIENTE = 0.3  # 30%
PROB_DEMISSAO_AGENTE = 0.3       # 30%
PROB_NOME_SOCIAL = 0.3           # 30%
PROB_PACIENTE_SEM_PROFISSAO = 0.2 # 20%
PROB_ANALFABETISMO = 0.3         # 30% (Ler/Escrever FALSE)
PROB_MENOR_IDADE = 0.3           # 30%

LIMIT_POSTO_ID_MIN = 1
LIMIT_POSTO_ID_MAX = 17
LIMIT_ENDERECO_ID_MIN = 1
LIMIT_ENDERECO_ID_MAX = 1000

SENHA_PADRAO = "123456789"

# Inicializa o Faker com localização Brasil
fake = Faker('pt_BR')

# ==============================================================================
# CARGA DE DADOS AUXILIARES (CBO)
# ==============================================================================
# Copiei o conteúdo do JSON fornecido para esta variável
cbo_data = [
   { "id": 243, "cbo2002ocupacao": 212405, "cbo_descricao": "Analista de desenvolvimento de sistemas" },
   { "id": 1367, "cbo2002ocupacao": 411010, "cbo_descricao": "Assistente administrativo" },
   { "id": 1625, "cbo2002ocupacao": 521110, "cbo_descricao": "Vendedor de comércio varejista" },
   { "id": 1937, "cbo2002ocupacao": 716610, "cbo_descricao": "Pintor de obras" },
   { "id": 1888, "cbo2002ocupacao": 715210, "cbo_descricao": "Pedreiro" },
   { "id": 1476, "cbo2002ocupacao": 512105, "cbo_descricao": "Empregado doméstico nos serviços gerais" },
   { "id": 2662, "cbo2002ocupacao": 848305, "cbo_descricao": "Padeiro" },
   { "id": 1541, "cbo2002ocupacao": 516110, "cbo_descricao": "Cabeleireiro" },
   { "id": 782, "cbo2002ocupacao": 252210, "cbo_descricao": "Contador" },
   { "id": 715, "cbo2002ocupacao": 241005, "cbo_descricao": "Advogado" },
   { "id": 475, "cbo2002ocupacao": 223505, "cbo_descricao": "Enfermeiro" },
   { "id": 599, "cbo2002ocupacao": 231315, "cbo_descricao": "Professor de educação física do ensino fundamental" },
   { "id": 2393, "cbo2002ocupacao": 782310, "cbo_descricao": "Motorista de furgão ou veículo similar" },
   {"id": 1518, "cbo2002ocupacao": 514320, "cbo_descricao": "Faxineiro"},
   {"id": 1808, "cbo2002ocupacao": 632370, "cbo_descricao": "Trabalhador da exploração de tucum"},
   {"id": 1487, "cbo2002ocupacao": 513225, "cbo_descricao": "Cozinheiro de embarcações"},
   {"id": 17, "cbo2002ocupacao": 21110, "cbo_descricao": "Sargento da policia militar"},
   {"id": 1724, "cbo2002ocupacao": 622510, "cbo_descricao": "Trabalhador no cultivo de espécies frutíferas rasteiras"},
   {"id": 233, "cbo2002ocupacao": 211210, "cbo_descricao": "Estatístico (estatística aplicada)"},
   {"id": 1193, "cbo2002ocupacao": 351710, "cbo_descricao": "Analista de sinistros"},
   {"id": 210, "cbo2002ocupacao": 203220, "cbo_descricao": "Pesquisador de engenharia mecânica"},
   {"id": 2297, "cbo2002ocupacao": 766405, "cbo_descricao": "Laboratorista fotográfico"},
   {"id": 2105, "cbo2002ocupacao": 740105, "cbo_descricao": "Supervisor da mecânica de precisão"},
   {"id": 338, "cbo2002ocupacao": 214715, "cbo_descricao": "Engenheiro de minas (lavra a céu aberto)"},
   {"id": 512, "cbo2002ocupacao": 223845, "cbo_descricao": "Fonoaudiólogo em voz"},
   {"id": 1059, "cbo2002ocupacao": 321320, "cbo_descricao": "Técnico em ranicultura"},
   {"id": 947, "cbo2002ocupacao": 312205, "cbo_descricao": "Técnico de estradas"},
   {"id": 1740, "cbo2002ocupacao": 622810, "cbo_descricao": "Trabalhador da cultura de plantas aromáticas e medicinais"},
   {"id": 439, "cbo2002ocupacao": 223157, "cbo_descricao": "Médico Urologista (Desativado em 04/2011)"},
   {"id": 883, "cbo2002ocupacao": 262215, "cbo_descricao": "Diretor de programas de televisão"},
   {"id": 1985, "cbo2002ocupacao": 722220, "cbo_descricao": "Operador de máquina de fundição"},
   {"id": 96, "cbo2002ocupacao": 123115, "cbo_descricao": "Diretor financeiro"},
   {"id": 290, "cbo2002ocupacao": 214225, "cbo_descricao": "Engenheiro civil (ferrovias e metrovias)"},
   {"id": 2132, "cbo2002ocupacao": 752105, "cbo_descricao": "Artesão modelador (vidros)"},
   {"id": 1782, "cbo2002ocupacao": 631415, "cbo_descricao": "Proeiro"},
   {"id": 1043, "cbo2002ocupacao": 318710, "cbo_descricao": "Desenhista projetista eletrônico"},
   {"id": 315, "cbo2002ocupacao": 214370, "cbo_descricao": "Tecnólogo em telecomunicações"},
   {"id": 2790, "cbo2002ocupacao": 992205, "cbo_descricao": "Encarregado geral de operações de conservação de vias permanentes (exceto trilhos)"},
   {"id": 141, "cbo2002ocupacao": 141725, "cbo_descricao": "Gerente de crédito imobiliário"},
   {"id": 2528, "cbo2002ocupacao": 821245, "cbo_descricao": "Operador de área de corrida"},
   {"id": 2676, "cbo2002ocupacao": 848605, "cbo_descricao": "Trabalhador do beneficiamento de fumo"},
   {"id": 2702, "cbo2002ocupacao": 910110, "cbo_descricao": "Supervisor de manutenção de aparelhos térmicos, de climatização e de refrigeração"},
   {"id": 36, "cbo2002ocupacao": 111220, "cbo_descricao": "Secretário - executivo"},
   {"id": 1154, "cbo2002ocupacao": 342305, "cbo_descricao": "Chefe de serviço de transporte rodoviário (passageiros e cargas)"},
   {"id": 231, "cbo2002ocupacao": 211120, "cbo_descricao": "Matemático aplicado"},
   {"id": 1080, "cbo2002ocupacao": 322310, "cbo_descricao": "Tecnico em Optometria"},
   {"id": 1281, "cbo2002ocupacao": 374145, "cbo_descricao": "Dj (disc jockey)"},
   {"id": 349, "cbo2002ocupacao": 214910, "cbo_descricao": "Engenheiro de controle de qualidade"},
   {"id": 477, "cbo2002ocupacao": 223515, "cbo_descricao": "Enfermeiro de bordo"},
   {"id": 635, "cbo2002ocupacao": 234125, "cbo_descricao": "Professor de pesquisa operacional (no ensino superior)"},
   {"id": 287, "cbo2002ocupacao": 214210, "cbo_descricao": "Engenheiro civil (aeroportos)"},
   {"id": 2276, "cbo2002ocupacao": 766130, "cbo_descricao": "Gravador de matriz para rotogravura (eletromecânico e químico)"},
   {"id": 2418, "cbo2002ocupacao": 782815, "cbo_descricao": "Boiadeiro"},
   {"id": 395, "cbo2002ocupacao": 223113, "cbo_descricao": "Médico Cirurgiao Toracico (Desativado em 04/2011)"},
   {"id": 47, "cbo2002ocupacao": 111320, "cbo_descricao": "Ministro do  superior tribunal do trabalho"},
   {"id": 1116, "cbo2002ocupacao": 331110, "cbo_descricao": "Auxiliar de desenvolvimento infantil"},
   {"id": 576, "cbo2002ocupacao": 225305, "cbo_descricao": "Médico citopatologista"},
   {"id": 2240, "cbo2002ocupacao": 763120, "cbo_descricao": "Riscador de roupas"},
   {"id": 2119, "cbo2002ocupacao": 742140, "cbo_descricao": "Confeccionador de piano"},
   {"id": 1864, "cbo2002ocupacao": 711410, "cbo_descricao": "Operador de salina (sal marinho)"},
   {"id": 348, "cbo2002ocupacao": 214905, "cbo_descricao": "Engenheiro de produção"},
   {"id": 641, "cbo2002ocupacao": 234315, "cbo_descricao": "Professor de geofísica"},
   {"id": 1470, "cbo2002ocupacao": 511215, "cbo_descricao": "Cobrador de transportes coletivos (exceto trem)"}
  
  # Nota: Adicionei uma amostra representativa para o script não ficar gigante. 
  # O script vai selecionar aleatoriamente desta lista.
]

# ==============================================================================
# FUNÇÕES UTILITÁRIAS
# ==============================================================================

def remover_acentos_e_espacos(texto):
    if not texto: return ""
    # Normaliza para remover acentos
    nfkd = unicodedata.normalize('NFKD', texto)
    sem_acento = "".join([c for c in nfkd if not unicodedata.combining(c)])
    # Remove caracteres especiais e espaços, mantendo letras e números
    import re
    return re.sub(r'[^a-zA-Z0-9]', '', sem_acento)

def gerar_email(nome_completo):
    partes = nome_completo.split()
    primeiro = remover_acentos_e_espacos(partes[0]).lower()
    ultimo = remover_acentos_e_espacos(partes[-1]).lower()
    return f"{primeiro}.{ultimo}@email.com"

def gerar_cpf_limpo():
    return fake.cpf().replace('.', '').replace('-', '')

def gerar_sus_limpo():
    # Gera 15 dígitos aleatórios
    return "".join([str(random.randint(0, 9)) for _ in range(15)])

def gerar_telefone_limpo():
    ddd = str(random.randint(11, 99)) # DDD com 2 digitos
    # Gera numero com 8 ou 9 digitos
    if random.choice([True, False]):
        numero = f"9{random.randint(10000000, 99999999)}"
    else:
        numero = f"{random.randint(20000000, 59999999)}" # Fixo
    return ddd + numero

def gerar_data_hora_trabalho(referencia=None):
    """
    Gera data entre hoje e 1 ano atrás.
    Horário fixo entre 08h e 16h.
    Se referencia for passada, usa a referencia para inatividade (tem que ser depois da criação)
    """
    agora = datetime.now()
    um_ano_atras = agora - timedelta(days=365)
    
    start_date = um_ano_atras
    end_date = agora

    # Random date logic
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_number_of_days)
    
    # Random time 08:00 to 16:00
    hora = random.randint(8, 15) # 15 pois o minuto vai somar
    minuto = random.randint(0, 59)
    segundo = random.randint(0, 59)
    
    data_final = random_date.replace(hour=hora, minute=minuto, second=segundo)
    
    return data_final

def formatar_sql_value(valor):
    if valor is None:
        return "NULL"
    if isinstance(valor, bool):
        return "TRUE" if valor else "FALSE"
    if isinstance(valor, (int, float)):
        return str(valor)
    return f'"{valor}"' # String com aspas duplas conforme solicitado

def gerar_nome_completo():
    while True:
        nome = fake.name()
        if len(nome.split()) >= 3:
            return nome
        # Se for curto, tenta adicionar um sobrenome
        nome += " " + fake.last_name()
        if len(nome.split()) >= 3:
            return nome

# ==============================================================================
# GERAÇÃO DE DADOS
# ==============================================================================

usuarios_sql = []
agentes_sql = []
pacientes_sql = []

print("Gerando dados...")

# --- 1. GERAR AGENTES ---
for _ in range(QTD_AGENTES):
    nome = gerar_nome_completo()
    cpf = gerar_cpf_limpo()
    email = gerar_email(nome)
    telefone = gerar_telefone_limpo()
    
    data_admissao = gerar_data_hora_trabalho()
    data_demissao = None
    
    # Regra 30% demissão
    if random.random() < PROB_DEMISSAO_AGENTE:
        # Data de demissão deve ser posterior à admissão (simplificado: gera nova data aleatória)
        data_demissao = gerar_data_hora_trabalho()
        # Se calhar de ser anterior, troca
        if data_demissao < data_admissao:
            data_demissao, data_admissao = data_admissao, data_demissao

    posto_id = random.randint(LIMIT_POSTO_ID_MIN, LIMIT_POSTO_ID_MAX)
    # Seleciona um CBO aleatório da lista carregada
    cbo_obj = random.choice(cbo_data)
    cbo_codigo = 5151 # Assumindo que o relacionamento usa o ID da tabela CBO

    # Insert Agente
    vals_agente = [
        nome,
        cpf,
        data_admissao.strftime("%Y-%m-%d"),
        data_demissao.strftime("%Y-%m-%d") if data_demissao else None,
        email,
        telefone,
        posto_id,
        cbo_codigo
    ]
    vals_fmt_agente = ", ".join([formatar_sql_value(v) for v in vals_agente])
    agentes_sql.append(f'({vals_fmt_agente})')

    # Insert Usuário (Agente)
    vals_user = [
        cpf,
        nome,
        SENHA_PADRAO,
        email,
        "agente",
        data_admissao.strftime("%Y-%m-%d %H:%M:%S"),
        data_demissao.strftime("%Y-%m-%d %H:%M:%S") if data_demissao else None
    ]
    vals_fmt_user = ", ".join([formatar_sql_value(v) for v in vals_user])
    usuarios_sql.append(f'({vals_fmt_user})')


# --- 2. GERAR PACIENTES ---
for _ in range(QTD_PACIENTES):
    nome = gerar_nome_completo()
    cpf = gerar_cpf_limpo()
    sus = gerar_sus_limpo()
    
    # Idade e Menoridade
    e_menor = random.random() < PROB_MENOR_IDADE
    if e_menor:
        data_nascimento = fake.date_of_birth(minimum_age=0, maximum_age=17)
        responsavel = fake.name()
    else:
        data_nascimento = fake.date_of_birth(minimum_age=18, maximum_age=90)
        responsavel = None

    nome_social = fake.name() if random.random() < PROB_NOME_SOCIAL else None
    genero = random.choice(["Masculino", "Feminino", "Outro"])
    etnia = random.choice(["Branco", "Pardo", "Preto", "Amarelo", "Indígena", "Asiático", "Outro"])
    estado_civil = random.choice(["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"])
    nacionalidade = "Brasileiro"
    naturalidade_uf = fake.state_abbr()
    naturalidade_mun = fake.city()
    filiacao_mae = fake.name_female()
    filiacao_pai = fake.name_male()
    telefone = gerar_telefone_limpo()
    email = gerar_email(nome)
    
    escolaridade_opts = ["Ensino Infantil Incompleto", "Ensino Infantil Completo", "Ensino Fundamental Incompleto", "Ensino Fundamental Completo", "Ensino Médio Incompleto", "Ensino Médio Completo", "Ensino Superior Incompleto", "Ensino Superior Completo"]
    escolaridade = random.choice(escolaridade_opts)
    nome_instituicao = f"Escola {fake.last_name()}"
    tipo_instituicao = random.choice(["Instituição Pública", "Instituição Privada"])
    estado_clinico = random.choice(["Saudável", "Em tratamento", "Observação", "Paliativo"])
    
    # Leitura/Escrita (Aleatório, max 30% False)
    sabe_ler = not (random.random() < PROB_ANALFABETISMO)
    sabe_escrever = not (random.random() < PROB_ANALFABETISMO)
    
    endereco_id = random.randint(LIMIT_ENDERECO_ID_MIN, LIMIT_ENDERECO_ID_MAX)
    # Agente responsável pelo paciente (pega um ID aleatório entre 1 e 255 gerados)
    agente_resp_id = random.randint(1, QTD_AGENTES)

    # Inatividade
    data_criacao = gerar_data_hora_trabalho()
    inatividade = None
    if random.random() < PROB_INATIVIDADE_PACIENTE:
        inatividade = gerar_data_hora_trabalho()
        if inatividade < data_criacao:
            inatividade, data_criacao = data_criacao, inatividade

    # Profissão Formatada
    profissao_str = None
    if not e_menor and random.random() > PROB_PACIENTE_SEM_PROFISSAO:
        cbo_p = random.choice(cbo_data)
        # Formato solicitado: '212405 - Analista de desenvolvimento de sistemas'
        profissao_str = f"{cbo_p['cbo2002ocupacao']} - {cbo_p['cbo_descricao']}"

    # Insert Paciente
    vals_paciente = [
        nome, nome_social, cpf, sus, data_nascimento.strftime("%Y-%m-%d"),
        genero, etnia, estado_civil, nacionalidade, naturalidade_uf, naturalidade_mun,
        filiacao_mae, filiacao_pai, telefone, email, escolaridade,
        nome_instituicao, tipo_instituicao, estado_clinico,
        sabe_ler, sabe_escrever, responsavel, endereco_id, agente_resp_id, profissao_str
    ]
    # Tratamento especial para inatividade no insert do paciente se existir coluna na tabela (no exemplo dado no prompt inatividade não está no INSERT INTO, mas está no SCHEMA. Vou adicionar ao insert pois foi solicitado lógica pra ele).
    # O exemplo de insert fornecido: values (..., agenteId, profissao). Não tem inatividade. 
    # Porém, a regra pede: "Para o campo inatividade dos pacientes... preenchido com datas".
    # Vou adicionar 'inatividade' ao final do insert.
    vals_paciente.append(inatividade.strftime("%Y-%m-%d %H:%M:%S") if inatividade else None)

    vals_fmt_paciente = ", ".join([formatar_sql_value(v) for v in vals_paciente])
    pacientes_sql.append(f'({vals_fmt_paciente})')

    # Insert Usuário (Paciente)
    vals_user_pac = [
        cpf,
        nome,
        SENHA_PADRAO,
        email,
        "paciente",
        data_criacao.strftime("%Y-%m-%d %H:%M:%S"),
        inatividade.strftime("%Y-%m-%d %H:%M:%S") if inatividade else None
    ]
    vals_fmt_user_pac = ", ".join([formatar_sql_value(v) for v in vals_user_pac])
    usuarios_sql.append(f'({vals_fmt_user_pac})')


# ==============================================================================
# GERAÇÃO DOS ARQUIVOS SQL
# ==============================================================================

def escrever_arquivo(nome_arquivo, header_insert, lista_valores):
    caminho = os.path.join(os.getcwd(), nome_arquivo)
    with open(caminho, "w", encoding="utf-8") as f:
        f.write(f"{header_insert}\n")
        # Junta todos com vírgula e quebra de linha
        f.write(",\n".join(lista_valores))
        f.write(";\n")
    print(f"Arquivo gerado: {caminho}")

# Headers baseados no seu exemplo
header_agente = 'INSERT INTO agente(nome_agente, cpf, data_admissao, data_demissao, email, telefone, postoId, cboCodigo) VALUES'

header_paciente = ('INSERT INTO paciente (nome, nome_social, cpf, sus, data_nascimento, genero, etnia, estado_civil, '
                   'nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae, filiacao_pai, telefone, '
                   'email, escolaridade, nome_instituicao, tipo_instituicao, estado_clinico, leitura, escrita, '
                   'responsavel_legal, enderecoId, agenteId, profissao, inatividade) VALUES')

header_usuario = 'INSERT INTO usuario (cpf, nome, senha, email, tipoUsuario, data_criacao, data_exclusao) VALUES'

escrever_arquivo("insert_agente.sql", header_agente, agentes_sql)
escrever_arquivo("insert_paciente.sql", header_paciente, pacientes_sql)
escrever_arquivo("insert_usuario.sql", header_usuario, usuarios_sql)

print("Processo concluído com sucesso!")