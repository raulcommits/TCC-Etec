import re
from collections import defaultdict

def organizar_inserts(arquivo_entrada, arquivo_saida):
    """
    Lê um arquivo SQL com comandos INSERT, organiza as linhas
    pelo nome da tabela e escreve o resultado em um novo arquivo.
    """
    # Dicionário para armazenar as linhas, agrupadas por nome da tabela
    inserts_por_tabela = defaultdict(list)
    
    # Expressão regular para encontrar o nome da tabela no comando INSERT
    # Procura por "INSERT INTO " seguido de qualquer caractere até o próximo espaço
    regex_tabela = re.compile(r"INSERT\s+INTO\s+([a-zA-Z0-9_]+)", re.IGNORECASE)

    try:
        # 1. Leitura do arquivo de entrada
        with open(arquivo_entrada, 'r', encoding='utf-8') as f:
            linhas = f.readlines()
            
        # 2. Processamento e agrupamento das linhas
        for linha in linhas:
            linha_limpa = linha.strip()
            if not linha_limpa:
                continue
            
            # Encontra o nome da tabela usando a regex
            match = regex_tabela.search(linha_limpa)
            
            if match:
                nome_tabela = match.group(1)
                inserts_por_tabela[nome_tabela].append(linha_limpa)
            else:
                # Se não for um INSERT INTO válido, pode ser ignorado ou tratado de outra forma
                # Aqui, vamos ignorar linhas que não se encaixam no padrão
                print(f"Aviso: Linha ignorada por não seguir o padrão INSERT: {linha_limpa}")

        # 3. Escrita no arquivo de saída
        with open(arquivo_saida, 'w', encoding='utf-8') as f:
            # Garante uma ordem de escrita consistente (ex: usuários antes de administradores)
            # Você pode mudar a ordem das chaves se precisar de uma sequência específica
            
            # Ordena as tabelas alfabeticamente para uma organização padrão
            tabelas_ordenadas = sorted(inserts_por_tabela.keys())
            
            for tabela in tabelas_ordenadas:
                f.write(f"-- Inserções para a tabela: {tabela}\n")
                for insert in inserts_por_tabela[tabela]:
                    f.write(insert + '\n')
                f.write('\n') # Adiciona uma linha em branco entre os grupos de tabelas

        print(f"Sucesso! O script organizado foi salvo em **{arquivo_saida}**.")

    except FileNotFoundError:
        print(f"Erro: O arquivo de entrada '{arquivo_entrada}' não foi encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

# --- Configuração ---
ARQUIVO_DE_ENTRADA = 'massa_dados.sql'
ARQUIVO_DE_SAIDA = 'massa_dados_organizado.sql'

# --- Execução ---
organizar_inserts(ARQUIVO_DE_ENTRADA, ARQUIVO_DE_SAIDA)