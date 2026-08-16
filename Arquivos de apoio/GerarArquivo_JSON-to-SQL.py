import json

# Carrega o JSON do arquivo
with open('zonas-bairros_embu-das-artes.json', 'r', encoding='utf-8') as file:
    zonas = json.load(file)

# Gera os comandos SQL
sql_lines = []
for zona in zonas:
    id = zona.get('id')
    bairro = zona.get('bairro')
    unidade = zona.get('unidade_administrativa')
    regiao = zona.get('regiao')

    # Escapa aspas simples para evitar erros no SQL
    bairro = bairro.replace("'", "''")
    unidade = unidade.replace("'", "''")
    regiao = regiao.replace("'", "''")

    sql = f"INSERT INTO zona (id, bairro, unidade_administrativa, regiao) VALUES ({id}, '{bairro}', '{unidade}', '{regiao}');"
    sql_lines.append(sql)

# Salva em um arquivo .sql
with open('zonas-bairros_embu-das-artes.sql', 'w', encoding='utf-8') as output:
    output.write('\n'.join(sql_lines))

print("Arquivo zonas-bairros_embu-das-artes.sql gerado com sucesso!")
