import random

# ==========================================
# CONFIGURAÇÕES (Edite os valores abaixo)
# ==========================================
NUM_LINHAS = 1000
NOME_ARQUIVO = "insert_enderecos.sql"
NOME_TABELA = "endereco"

# O TypeORM costuma criar as chaves estrangeiras no banco adicionando "Id" ao nome da relação.
# Caso seu banco esteja usando snake_case (ex: zona_id), altere as variáveis abaixo.
COL_ZONA = "zonaId"
COL_MATERIAL = "material_predominanteId"
COL_IMOVEL = "tipo_imovelId"
COL_ANIMAL = "tipo_animalId"
# ==========================================

# Dados genéricos para simular endereços reais
logradouros = ["Rua das Flores", "Avenida Brasil", "Rua XV de Novembro", "Rua São Jorge", "Rua da Paz", "Avenida Central", "Rua Bela Vista", "Travessa dos Lagos", "Rodovia Principal", "Rua do Sol"]
bairros = ["Centro", "Jardim Paulista", "Vila Nova", "Parque das Árvores", "Jardim Primavera", "Bairro Alto", "Vila Esperança", "Jardim São Paulo"]
cidades = ["Embu das Artes", "São Paulo", "Taboão da Serra", "Itapecerica da Serra", "Cotia"]
estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]
complementos = ["Apto 12", "Casa 2", "Bloco B", "Fundos", "Apto 101", "Casa 5", None, None, None, None] # Maior chance de ser nulo
referencias = ["Próximo à escola", "Em frente ao hospital", "Ao lado do posto de saúde", "Perto do supermercado", "Esquina com a padaria", "Atrás da igreja", None, None, None, None] # Mescla de nulos e preenchidos

def formata_string(valor):
    """Retorna NULL se vazio, ou coloca o texto entre aspas simples (escapando aspas internas)"""
    if valor is None:
        return "NULL"
    valor_escapado = str(valor).replace("'", "''")
    return f"'{valor_escapado}'"

print(f"Gerando script com {NUM_LINHAS} linhas...")

with open(NOME_ARQUIVO, 'w', encoding='utf-8') as f:
    f.write(f"-- Script gerado automaticamente para a tabela {NOME_TABELA}\n")
    
    colunas = f"id, logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia, {COL_ZONA}, {COL_MATERIAL}, {COL_IMOVEL}, {COL_ANIMAL}"
    
    f.write(f"INSERT INTO {NOME_TABELA} ({colunas}) VALUES \n")

    for i in range(1, NUM_LINHAS + 1):
        # Gerando dados randômicos
        id_val = i
        logradouro = f"{random.choice(logradouros)} {random.randint(1, 15)}"
        numero = str(random.randint(1, 9999))
        complemento = random.choice(complementos)
        bairro = random.choice(bairros)
        cidade = random.choice(cidades)
        estado = random.choice(estados)
        cep = f"{random.randint(10000, 99999)}-{random.randint(100, 999)}"
        pais = "Brasil"
        ponto_ref = random.choice(referencias)

        # Relações randômicas conforme sua regra
        zona_id = random.randint(1, 112)
        material_id = random.randint(1, 4)
        imovel_id = random.randint(1, 4)
        
        # tipo_animal pode ser nulo, então aplicamos uma chance de 50% de ter um animal
        tem_animal = random.choice([True, False])
        animal_id = random.randint(1, 4) if tem_animal else "NULL"

        # Monta a string do VALUE atual
        linha_values = f"({id_val}, {formata_string(logradouro)}, {formata_string(numero)}, {formata_string(complemento)}, {formata_string(bairro)}, {formata_string(cidade)}, {formata_string(estado)}, {formata_string(cep)}, {formata_string(pais)}, {formata_string(ponto_ref)}, {zona_id}, {material_id}, {imovel_id}, {animal_id})"
        
        # Se for a última linha finaliza com ponto e vírgula, senão com vírgula (formato multi-insert)
        if i == NUM_LINHAS:
            f.write(linha_values + ";\n")
        else:
            f.write(linha_values + ",\n")

print(f"Sucesso! Arquivo '{NOME_ARQUIVO}' criado.")