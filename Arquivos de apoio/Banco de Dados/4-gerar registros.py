import random
from datetime import datetime, timedelta
import os

def gerar_inserts(qtd_registros=80):
    # Configurações iniciais
    table_name = "registro_atividade"
    
    # Listas para os Enums
    motivos = ["Cadastramento/Atualização", "Visita Periódica"]
    desfechos = ["Visita realizada", "Visita recusada", "Ausente"]
    
    # Descrições genéricas para preencher o campo 'descricao'
    descricoes = [
        "Paciente relatou melhora nos sintomas.",
        "Não havia ninguém em casa.",
        "Atualização de cadastro realizada com sucesso.",
        "Entrega de medicação agendada.",
        "Verificação de pressão arterial normal.",
        "Recusou atendimento no momento.",
        "Agendado retorno para próxima semana.",
        None # Algumas descrições podem ser nulas
    ]

    inserts = []
    
    # Dicionário para controlar a sequencia XXX por dia (AAMMDD)
    # Chave: AAMMDD, Valor: Inteiro (ultimo numero usado)
    controle_sequencia_diaria = {}

    # Data inicial simulada (ex: 30 dias atrás)
    data_base = datetime.now() - timedelta(days=30)

    print(f"-- Gerando {qtd_registros} registros para a tabela {table_name}")

    for _ in range(qtd_registros):
        # 1. Gerar Data e Hora (Distribuidas nos ultimos 30 dias, horario comercial 08h-16h)
        dias_aleatorios = random.randint(0, 30)
        
        # Define a hora entre 8 e 15 (para garantir até 15:59:59)
        hora = random.randint(8, 15) 
        minuto = random.randint(0, 59)
        segundo = random.randint(0, 59)
        
        # Cria a data baseada no dia aleatório e substitui pelo horário comercial definido
        data_atual = (data_base + timedelta(days=dias_aleatorios)).replace(hour=hora, minute=minuto, second=segundo)
        
        # Formato Internacional para o banco (YYYY-MM-DD HH:MM:SS)
        data_visita_sql = data_atual.strftime("%Y-%m-%d %H:%M:%S")

        # 2. Gerar Registro (AAMMDD-XXX)
        # Formata a parte da data: AA (Ano 2 digitos) MM DD
        prefixo_registro = data_atual.strftime("%y%m%d")
        
        # Lógica para incrementar o XXX baseado no dia
        if prefixo_registro not in controle_sequencia_diaria:
            controle_sequencia_diaria[prefixo_registro] = 1
        else:
            controle_sequencia_diaria[prefixo_registro] += 1
            
        sequencia = controle_sequencia_diaria[prefixo_registro]
        
        # Garante que não ultrapasse 999 (opcional, mas seguro)
        if sequencia > 999:
            sequencia = 999 

        # Formata XXX com zeros a esquerda (ex: 1 vira 001)
        registro_visita = f"{prefixo_registro}-{sequencia:03d}"

        # 3. Gerar IDs Relacionais
        agente_id = random.randint(1, 250)
        
        # Regra: Paciente e Endereço devem ter o mesmo ID (entre 1 e 100)
        paciente_endereco_id = random.randint(1, 100)

        # 4. Enums e Texto
        motivo = random.choice(motivos)
        desfecho = random.choice(desfechos)
        descricao = random.choice(descricoes)
        
        # Tratar a descrição para SQL (NULL ou String entre aspas)
        descricao_sql = "NULL" if descricao is None else f"'{descricao}'"

        # 5. Montar a Query
        # Nota: Assumi que as colunas de chave estrangeira no banco são 'agenteId', 'pacienteId', etc.
        # Se o TypeORM gerou como 'agente_id', basta alterar abaixo.
        query = (
            f"INSERT INTO {table_name} "
            f"(data_visita, registro_visita, motivo, desfecho, descricao, agenteId, pacienteId, enderecoId) "
            f"VALUES ('{data_visita_sql}', '{registro_visita}', '{motivo}', '{desfecho}', {descricao_sql}, {agente_id}, {paciente_endereco_id}, {paciente_endereco_id});"
        )
        
        inserts.append(query)

    # Ordenar inserts por data (opcional, mas fica mais bonito)
    inserts.sort(key=lambda x: x.split("VALUES ('")[1].split("'")[0])

    return inserts

if __name__ == "__main__":
    # Gera 50 inserts de exemplo
    qtd = 50
    sql_commands = gerar_inserts(qtd)
    
    # Pega o caminho absoluto da pasta onde este script está
    diretorio_script = os.path.dirname(os.path.abspath(__file__))
    caminho_arquivo = os.path.join(diretorio_script, "registros.sql")
    
    try:
        with open(caminho_arquivo, "w", encoding="utf-8") as f:
            f.write("\n".join(sql_commands))
        print(f"Sucesso! O arquivo foi gerado em: {caminho_arquivo}")
    except Exception as e:
        print(f"Erro ao salvar o arquivo: {e}")