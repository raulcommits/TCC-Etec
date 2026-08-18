import random
import string
from datetime import datetime, timedelta

# ==========================================
# CONFIGURAÇÕES (Edite os valores abaixo)
# ==========================================
NUM_LINHAS = 500
NOME_ARQUIVO = "insert_completo.sql"

# Nomes das tabelas
TB_ENDERECO = "endereco"
TB_USUARIO = "usuario"
TB_PACIENTE = "paciente"

# Nomes das chaves estrangeiras (TypeORM padrão usa o nome da relation + Id)
COL_ZONA = "zonaId"
COL_MATERIAL = "material_predominanteId"
COL_IMOVEL = "tipo_imovelId"
COL_ANIMAL = "tipo_animalId"

COL_ENDERECO_PACIENTE = "enderecoId"
COL_AGENTE_PACIENTE = "agenteId"
# ==========================================

# Conjuntos de dados genéricos para sorteio
nomes = ["João", "Maria", "Carlos", "Ana", "Paulo", "Fernanda", "Lucas", "Juliana", "Marcos", "Aline", "Pedro", "Camila"]
sobrenomes = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes"]
generos = ["Masculino", "Feminino", "Outros"]
etnias = ["Branco", "Pardo", "Preto", "Amarelo", "Indígena"]
estados_civis = ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"]
nacionalidades = ["Brasileira", "Estrangeira"]
escolaridades = ["Ensino Fundamental", "Ensino Médio", "Ensino Superior", "Pós-graduação", "Nenhuma"]
profissoes = ["Pedreiro", "Professor", "Motorista", "Enfermeiro", "Comerciante", "Estudante", "Aposentado", "Engenheiro", None, None]
estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

logradouros = ["Rua das Flores", "Avenida Brasil", "Rua XV de Novembro", "Rua São Jorge", "Rua da Paz", "Avenida Central"]
bairros = ["Centro", "Jardim Paulista", "Vila Nova", "Parque das Árvores", "Jardim Primavera", "Bairro Alto", "Vila Esperança", "Jardim São Paulo"]
# Adicionando ênfase em Embu das Artes e região, baseado no contexto de projeto de saúde
cidades = ["Embu das Artes", "São Paulo", "Taboão da Serra", "Itapecerica da Serra", "Cotia"]
complementos = ["Apto 12", "Casa 2", "Bloco B", "Fundos", "Apto 101", "Casa 5", None, None, None, None] 
referencias = ["Próximo à escola", "Em frente ao hospital", "Ao lado do posto de saúde", "Perto do supermercado", "Esquina com a padaria", "Atrás da igreja", None, None, None, None]

# Variáveis para garantir unicidade
cpfs_usados = set()
sus_usados = set()

def formata_sql(valor):
    """Formata os valores para SQL (NULL, Booleanos, ou String com escape)"""
    if valor is None:
        return "NULL"
    if isinstance(valor, bool):
        return "TRUE" if valor else "FALSE"
    # Escapa aspas simples duplicando-as
    valor_escapado = str(valor).replace("'", "''")
    return f"'{valor_escapado}'"

def gera_documento_unico(tamanho, conjunto_existentes):
    """Gera numeração aleatória de tamanho fixo garantindo que seja única"""
    while True:
        doc = ''.join(random.choices(string.digits, k=tamanho))
        if doc not in conjunto_existentes:
            conjunto_existentes.add(doc)
            return doc

def gera_data_nascimento():
    ano = random.randint(1940, 2023)
    mes = random.randint(1, 12)
    dia = random.randint(1, 28)
    return f"{ano}-{mes:02d}-{dia:02d}"

def gera_data_hora_recente():
    agora = datetime.now()
    dias_atras = random.randint(0, 365)
    data = agora - timedelta(days=dias_atras)
    return data.strftime("%Y-%m-%d %H:%M:%S")

print(f"Gerando script com {NUM_LINHAS} registros para cada tabela...")

# Armazenaremos as linhas de VALUES para montar o SQL no final
inserts_endereco = []
inserts_usuario = []
inserts_paciente = []

for i in range(1, NUM_LINHAS + 1):
    # ==========================================
    # 1. DADOS DO ENDEREÇO
    # ==========================================
    endereco_id = i
    logradouro = f"{random.choice(logradouros)} {random.randint(1, 15)}"
    numero = str(random.randint(1, 9999))
    complemento = random.choice(complementos)
    bairro = random.choice(bairros)
    cidade = random.choice(cidades)
    estado_end = random.choice(estados)
    cep = f"{random.randint(10000, 99999)}-{random.randint(100, 999)}"
    pais = "Brasil"
    ponto_ref = random.choice(referencias)
    
    zona_id = random.randint(1, 112)
    material_id = random.randint(1, 4)
    imovel_id = random.randint(1, 4)
    animal_id = random.randint(1, 4) if random.choice([True, False]) else None

    inserts_endereco.append(
        f"({endereco_id}, {formata_sql(logradouro)}, {formata_sql(numero)}, {formata_sql(complemento)}, {formata_sql(bairro)}, {formata_sql(cidade)}, {formata_sql(estado_end)}, {formata_sql(cep)}, {formata_sql(pais)}, {formata_sql(ponto_ref)}, {zona_id}, {material_id}, {imovel_id}, {formata_sql(animal_id)})"
    )

    # ==========================================
    # 2. DADOS COMPARTILHADOS (Usuário / Paciente)
    # ==========================================
    cpf = gera_documento_unico(11, cpfs_usados)
    nome_pessoa = f"{random.choice(nomes)} {random.choice(sobrenomes)} {random.choice(sobrenomes)}"
    email = f"{nome_pessoa.replace(' ', '.').lower()}@email.com"

    # ==========================================
    # 3. DADOS DO USUÁRIO
    # ==========================================
    senha = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    tipo_usuario = "paciente"
    data_criacao = gera_data_hora_recente()
    # 5% de chance de ter data de exclusão
    data_exclusao = gera_data_hora_recente() if random.random() < 0.05 else None

    inserts_usuario.append(
        f"({formata_sql(cpf)}, {formata_sql(nome_pessoa)}, {formata_sql(senha)}, {formata_sql(email)}, {formata_sql(tipo_usuario)}, {formata_sql(data_criacao)}, {formata_sql(data_exclusao)})"
    )

    # ==========================================
    # 4. DADOS DO PACIENTE
    # ==========================================
    paciente_id = i
    sus = gera_documento_unico(15, sus_usados)
    nome_social = f"{random.choice(nomes)} {random.choice(sobrenomes)}" if random.random() < 0.1 else None # 10% de chance
    data_nasc = gera_data_nascimento()
    genero = random.choice(generos)
    etnia = random.choice(etnias)
    estado_civil = random.choice(estados_civis)
    nacionalidade = random.choice(nacionalidades)
    nat_estado = random.choice(estados)
    nat_municipio = random.choice(cidades)
    
    # 80% de chance de ter nome dos pais, senão cai no default "Desconhecido" do banco
    fil_mae = f"Maria {random.choice(sobrenomes)}" if random.random() < 0.8 else "Desconhecido"
    fil_pai = f"José {random.choice(sobrenomes)}" if random.random() < 0.8 else "Desconhecido"
    
    telefone = f"119{random.randint(10000000, 99999999)}"
    escolaridade = random.choice(escolaridades)
    nome_inst = "UBS " + random.choice(bairros)
    tipo_inst = "Pública"
    estado_clinico = random.choice(["Estável", "Em acompanhamento", "Alta", "Triagem"])
    leitura = random.choice([True, False])
    escrita = random.choice([True, False])
    resp_legal = f"{random.choice(nomes)} {random.choice(sobrenomes)}" if random.random() < 0.2 else None
    inatividade = gera_data_hora_recente() if random.random() < 0.05 else None
    profissao = random.choice(profissoes)
    
    # Relação com Agente (1 a 250) podendo ser nula (20% de chance de ser nulo)
    agente_id = random.randint(1, 250) if random.random() < 0.8 else None

    inserts_paciente.append(
        f"({paciente_id}, {formata_sql(cpf)}, {formata_sql(sus)}, {formata_sql(nome_pessoa)}, {formata_sql(nome_social)}, {formata_sql(data_nasc)}, {formata_sql(genero)}, {formata_sql(etnia)}, {formata_sql(estado_civil)}, {formata_sql(nacionalidade)}, {formata_sql(nat_estado)}, {formata_sql(nat_municipio)}, {formata_sql(fil_mae)}, {formata_sql(fil_pai)}, {formata_sql(telefone)}, {formata_sql(email)}, {formata_sql(escolaridade)}, {formata_sql(nome_inst)}, {formata_sql(tipo_inst)}, {formata_sql(estado_clinico)}, {formata_sql(leitura)}, {formata_sql(escrita)}, {formata_sql(resp_legal)}, {formata_sql(inatividade)}, {formata_sql(profissao)}, {endereco_id}, {formata_sql(agente_id)})"
    )

# Escrevendo no arquivo
with open(NOME_ARQUIVO, 'w', encoding='utf-8') as f:
    f.write("-- Script gerado automaticamente\n\n")
    
    # Escreve Endereços
    f.write(f"INSERT INTO {TB_ENDERECO} (id, logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia, {COL_ZONA}, {COL_MATERIAL}, {COL_IMOVEL}, {COL_ANIMAL}) VALUES \n")
    f.write(",\n".join(inserts_endereco) + ";\n\n")

    # Escreve Usuários
    f.write(f"INSERT INTO {TB_USUARIO} (cpf, nome, senha, email, tipoUsuario, data_criacao, data_exclusao) VALUES \n")
    f.write(",\n".join(inserts_usuario) + ";\n\n")

    # Escreve Pacientes
    f.write(f"INSERT INTO {TB_PACIENTE} (id, cpf, sus, nome, nome_social, data_nascimento, genero, etnia, estado_civil, nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae, filiacao_pai, telefone, email, escolaridade, nome_instituicao, tipo_instituicao, estado_clinico, leitura, escrita, responsavel_legal, inatividade, profissao, {COL_ENDERECO_PACIENTE}, {COL_AGENTE_PACIENTE}) VALUES \n")
    f.write(",\n".join(inserts_paciente) + ";\n")

print(f"Sucesso! Arquivo '{NOME_ARQUIVO}' criado.")