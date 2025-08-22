create database tcc_pep_2025;
use tcc_pep_2025;

create table paciente (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nome varchar(70),
    nome_social varchar(70),                      -- Identificador único
    cpf CHAR(11) UNIQUE,                          -- CPF como chave única
    sus CHAR(15),
    data_nascimento DATE,
    num_telefone varchar(11),
    email varchar(45),
    etnia CHAR(15),                               -- verificar o tipo necessário
    genero CHAR(25), 
    escolaridade VARCHAR(20),
    nacionalidade CHAR(15),
    naturalidade_estado CHAR(20),
    naturalidade_municipio CHAR(25),
    -- profissao JSON,                            -- Campo para armazenar JSON de CBO
    estado_clinico VARCHAR(10),
    responsavel_legal VARCHAR(5), 
    filiacao_mae CHAR(40),
    filiacao_pai CHAR(40),
    enderecos VARCHAR(40)
    );
   
create table endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,   -- Identificador único (Chave primária)
    logradouro VARCHAR(100) NOT NULL,             -- Rua, Avenida, Travessa, etc.
    numero VARCHAR(10),                           -- Incluindo possibilidade de "S/N"
    complemento VARCHAR(50),                      -- Apartamento, Bloco, Fundos, etc.
    bairro VARCHAR(50),
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL,                   -- Sigla do estado (SP, RJ, MG)
    cep VARCHAR(9) NOT NULL,                      -- Formato: 00000-000
    pais VARCHAR(50) DEFAULT 'Brasil',            -- Campo para registros internacionais
    ponto_referencia VARCHAR(100),                -- Exemplo: Próximo ao mercado X
    zona ENUM('Urbana', 'Rural', 'Indígena'),     -- Opções para a zona
    tipo_imovel int default 1,                    -- casa, apartamento, sobrado, predio, etc
    material_predominante int default 1,          -- tijolos e alvenaria, barro, madeira, etc
    animal int default 0,                         -- não tem, ou tem 1, 2, 3, 4, 5 ou mais de 5
    tipo_animal int default 0                     -- cachorro, gato, roedor, galinha, equino, pássaro
    );
    
CREATE TABLE posto_saude (
    id_posto INT AUTO_INCREMENT PRIMARY KEY,      -- Identificador único (Chave primária)
    nome_posto VARCHAR(100) NOT NULL,             -- Nome do posto de saúde
    endereco INT,                                 -- Chave estrangeira para a tabela de endereços
    telefone VARCHAR(15),                         -- Número de telefone do posto
    email VARCHAR(100),                           -- Endereço de email
    horario_funcionamento VARCHAR(50),            -- Horário de funcionamento
    tipo_atendimento ENUM('UBS', 'UPA', 'AMA'),   -- Tipos de atendimento possíveis
    capacidade INT,                               -- Capacidade de atendimento diário
	-- servicos_disponiveis JSON,                 -- Serviços disponíveis (vacinação, consultas, exames, etc.)
    -- responsavel_posto JSON,                    -- Nome, cargo e contato do responsável
    regiao_de_abrangencia INT,                    -- FK: Referência à tabela endereços para áreas de abrangência
    CONSTRAINT fk_endereco FOREIGN KEY (endereco) REFERENCES endereco(id_endereco),
    CONSTRAINT fk_regiao FOREIGN KEY (regiao_de_abrangencia) REFERENCES endereco(id_endereco)
);

CREATE TABLE profissional (
    id_profissional INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único do profissional
    nome VARCHAR(100) NOT NULL,                     -- Nome completo
    cpf CHAR(11) UNIQUE,                            -- CPF com 11 dígitos, único
    cbo VARCHAR(6),                                 -- Código Brasileiro de Ocupações (CBO)
    crm VARCHAR(20),                                -- CRM ou registro profissional
    data_admissao DATE,                             -- Data de admissão
    data_demissao DATE,                             -- Data de demissão (pode ser NULL se ativo)
    id_posto INT,                                   -- Chave estrangeira para a tabela posto_saude
    -- horario_atendimento JSON,                    -- Horário de atendimento em formato JSON
    contato_email VARCHAR(100),                     -- Email de contato
    contato_telefone VARCHAR(15),                   -- Telefone de contato
    CONSTRAINT fk_posto FOREIGN KEY (id_posto) REFERENCES posto_saude(id_posto) -- Chave estrangeira
);

	

   
   



	
