create database tcc_pep_2025_v2;
use tcc_pep_2025_v2;

CREATE TABLE zona (
    id_zona INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO zona (descricao) VALUES ('Urbana'), ('Rural'), ('Indígena');




 create table endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,   -- Identificador único (Chave primária)
    logradouro VARCHAR(100) NOT NULL,             -- Rua, Avenida, Travessa, etc.
    numero VARCHAR(10),                           -- Incluindo possibilidade de "S/N"
    complemento VARCHAR(50),                      -- Apartamento, Bloco, Fundos, etc.
    bairro VARCHAR(50),
    cidade VARCHAR(50) NOT NULL,
    estado CHAR(2) NOT NULL,                       -- Sigla do estado (SP, RJ, MG)
    cep VARCHAR(10) NOT NULL,                      -- Formato: 00000-000
    pais VARCHAR(50) DEFAULT 'Brasil',            -- Campo para registros internacionais
    ponto_referencia VARCHAR(100),                -- Exemplo: Próximo ao mercado X
    id_zona int not null,     -- Opções para a zona
    tipo_imovel int default 1,                    -- casa, apartamento, sobrado, predio, etc
    material_predominante int default 1,          -- tijolos e alvenaria, barro, madeira, etc
    animal int default 0,                         -- não tem, ou tem 1, 2, 3, 4, 5 ou mais de 5
    tipo_animal int default 0,                     -- cachorro, gato, roedor, galinha, equino, pássaro
	CONSTRAINT fk_zona FOREIGN KEY (id_zona) REFERENCES zona(id_zona)
);

    
create table paciente (
    id_paciente int auto_increment primary key,
    nome varchar(70),
    nome_social varchar(70),                      
    cpf char(14) unique,                      
    sus char(15),
    data_nascimento date,
    num_telefone varchar(15),
    email varchar(100),
    etnia char(15),                               
    genero char(25), 
    escolaridade varchar(20),
    nacionalidade char(15),
    naturalidade_estado char(20),
    naturalidade_municipio char(25),
    estado_clinico varchar(10),
    responsavel_legal varchar(5), 
    filiacao_mae char(100),
    filiacao_pai char(100),
    id_endereco int not null,
    constraint fk_endereco foreign key (id_endereco) references endereco(id_endereco)
);

create table posto_saude (
    id_posto int auto_increment primary key,      -- Identificador único (Chave primária)
    nome_posto varchar(100) not null,             -- Nome do posto de saúde
    id_endereco int not null,                        -- Chave estrangeira para a tabela de endereços
    telefone varchar(15),                         -- Número de telefone do posto
    email varchar(100),                           -- Endereço de email  
    horario_funcionamento varchar(50),            -- Horário de funcionamento
    tipo_atendimento enum('UBS', 'UPA', 'AMA'),   -- Tipos de atendimento possíveis
    capacidade int,                               -- Capacidade de atendimento diário
	servicos_disponiveis text,                    -- Serviços disponíveis (vacinação, consultas, exames, etc.)
    responsavel_posto text,                       -- Nome, cargo e contato do responsável
    id_regiao int,                    -- FK: Referência à tabela endereços para áreas de abrangência
    constraint fk_endereco_posto foreign key (id_endereco) references endereco(id_endereco),
    constraint fk_regiao foreign key (id_regiao) references endereco(id_endereco)
);
    
create table profissional (
    id_profissional int auto_increment primary key, -- Identificador único do profissional
    nome varchar(100) not null,                     -- Nome completo
    cpf char(14) unique,                            -- CPF com 11 dígitos, único
    cbo varchar(6),                                 -- Código Brasileiro de Ocupações (CBO)
    crm VARCHAR(20),                                -- CRM ou registro profissional
    data_admissao date,                             -- Data de admissão
    data_demissao date,                             -- Data de demissão (pode ser NULL se ativo)
    id_posto int,                                   -- Chave estrangeira para a tabela posto_saude
    horario_atendimento text,                        -- Horário de atendimento em formato JSON
    contato_email varchar(100),                     -- Email de contato
    contato_telefone varchar(15),                   -- Telefone de contato
    constraint fk_posto foreign key (id_posto) references posto_saude(id_posto) -- Chave estrangeira
);

    


create table users (
	nome varchar(35),
    cpf char(14) primary key,
    email varchar(30),
    senha varbinary(255) not null
);

create table registro_atividade (
	id int auto_increment primary key,
    data_visita date,
    id_profissional int not null,
    id_paciente int not null,
    observacoes text,
    acoes_realizadas text,
    constraint fk_paciente_registro foreign key (id_paciente) references paciente(id_paciente),
    constraint fk_profissional_registro foreign key (id_profissional) references profissional(id_profissional)
);
    

create table cbo(
	codigo int default 0 primary key,
    descricao varchar(255) default ''
    /*CONSTRAINT fk_cbo FOREIGN KEY (cbo) REFERENCES cbo(codigo)*/
    );

select * from cbo;

ALTER TABLE profissional ADD CONSTRAINT fk_cbo FOREIGN KEY (cbo) REFERENCES cbo(codigo);



    

