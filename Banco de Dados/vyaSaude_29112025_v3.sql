drop database vyasaude_26102025;
CREATE DATABASE vyaSaude_26102025;
USE vyaSaude_26102025;

-- Tabela usuario
CREATE TABLE usuario (
    cpf CHAR(11) PRIMARY KEY,
    nome VARCHAR(50),
    senha VARCHAR(30),
    email VARCHAR(50),
    telefone VARCHAR(15),-- ADICIONADO para compatibilidade com inserts
    tipoUsuario ENUM('admin', 'agente', 'recepcao', 'gerente', 'paciente'),
    createdAt DATETIME,
    deletedAt DATETIME
);

-- Tabela administrador
CREATE TABLE administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_admin VARCHAR(50),
    cpf CHAR(11),
    data_admissao DATE,
    data_demissao DATE,
    email VARCHAR(100),
    telefone VARCHAR(15),
    FOREIGN KEY (cpf) REFERENCES usuario(cpf)
);

-- Tabela agente
CREATE TABLE agente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_admin VARCHAR(50),
    cpf CHAR(11),
    data_admissao DATE,
    data_demissao DATE,
    email VARCHAR(100),
    telefone VARCHAR(15),
    codigo_cbo INT,
    FOREIGN KEY (cpf) REFERENCES usuario(cpf)
);

-- Tabela recepcao
CREATE TABLE recepcao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_recepcionista VARCHAR(100),
    cpf CHAR(11),
    data_admissao DATE,
    data_demissao DATE,
    email VARCHAR(100),
    telefone VARCHAR(15),
    FOREIGN KEY (cpf) REFERENCES usuario(cpf)
);

-- Tabela gerentePosto
CREATE TABLE gerentePosto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    telefone VARCHAR(15),
    cargo VARCHAR(50)
);

-- Tabela cbo
CREATE TABLE cbo (
    codigo INT PRIMARY KEY,
    descricao VARCHAR(255)
);

-- Tabela material_predominante
CREATE TABLE material_predominante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_material ENUM('Alvenaria', 'Madeira', 'Misto', 'Pré-fabricado')
);

-- Tabela tipo_animal
CREATE TABLE tipo_animal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_animal ENUM('Cachorro', 'Gato', 'Pássaro', 'Outros')
);

-- Tabela tipo_imovel
CREATE TABLE tipo_imovel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_imovel ENUM('Casa', 'Apartamento', 'Comercial', 'Terreno')
);

-- Tabela zona
CREATE TABLE zona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bairro VARCHAR(35),
    unidade_administrativa VARCHAR(35),
    regiao VARCHAR(10)
);

-- Tabela endereco
CREATE TABLE endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(100),
    numero INT,
    complemento VARCHAR(20),
    bairro VARCHAR(20),
    cidade VARCHAR(100),
    estado VARCHAR(11),
    cep CHAR(8),
    pais VARCHAR(50),
    ponto_referencia VARCHAR(50),
    id_zona INT,
    id_material INT,
    id_tipo_imovel INT,
    FOREIGN KEY (id_zona) REFERENCES zona(id),
    FOREIGN KEY (id_material) REFERENCES material_predominante(id),
    FOREIGN KEY (id_tipo_imovel) REFERENCES tipo_imovel(id)
);

-- Tabela medico
CREATE TABLE medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_medico VARCHAR(100),
    crm VARCHAR(10),
    cpf CHAR(11),
    data_admissao DATE,
    data_demissao DATE,
    email VARCHAR(100),
    telefone VARCHAR(15)
);

-- Tabela paciente
CREATE TABLE paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    nome_social VARCHAR(100),
    cpf CHAR(11),
    sus CHAR(15),
    data_nascimento DATE,
    genero CHAR(15),
    etnia CHAR(15),
    estado_civil VARCHAR(50),
    nacionalidade CHAR(15),
    naturalidade_estado CHAR(2),
    naturalidade_municipio CHAR(25),
    filiacao_mae CHAR(100),
    filiacao_pai CHAR(100),
    telefone VARCHAR(15),
    email VARCHAR(100),
    escolaridade VARCHAR(50),
    nome_instituicao VARCHAR(50),
    tipo_instituicao VARCHAR(50),
    estado_clinico VARCHAR(50),
    leitura ENUM('Sim', 'Não'),
    escrita ENUM('Sim', 'Não'),
    responsavel_legal VARCHAR(70),
    inatividade DATETIME,
    id_endereco INT,
    FOREIGN KEY (cpf) REFERENCES usuario(cpf),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);

-- Tabela posto
CREATE TABLE posto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_posto VARCHAR(100),
    telefone VARCHAR(11),
    email VARCHAR(100),
    horario_funcionamento TEXT,
    tipo_atendimento ENUM('UBS', 'UPA', 'AMA'),
    capacidade INT,
    servicos_disponiveis TEXT,
    id_endereco INT,
    id_gerente INT,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id),
    FOREIGN KEY (id_gerente) REFERENCES gerentePosto(id)
);

-- Tabela registro_atividade
CREATE TABLE registro_atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_visita DATETIME,
    motivo ENUM('Cadastramento/Atualização', 'Visita Periódica'),
    desfecho VARCHAR(50),
    descricao TEXT,
    id_tipo_animal INT,
    id_paciente INT,
    id_medico INT,
    FOREIGN KEY (id_tipo_animal) REFERENCES tipo_animal(id),
    FOREIGN KEY (id_paciente) REFERENCES paciente(id),
    FOREIGN KEY (id_medico) REFERENCES medico(id)
);

-- Tabela logAcesso
CREATE TABLE logAcesso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atividade TEXT,
    logout TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Zona
INSERT INTO zona (bairro, unidade_administrativa, regiao) VALUES
('Centro', 'Unidade 1', 'Sul'),
('Jardim Santo Eduardo', 'Unidade 2', 'Leste'),
('Parque Pirajussara', 'Unidade 3', 'Norte');

-- Material Predominante
INSERT INTO material_predominante (nome_material) VALUES
('Alvenaria'),
('Madeira'),
('Misto'),
('Pré-fabricado');

-- Tipo Imóvel
INSERT INTO tipo_imovel (nome_imovel) VALUES
('Casa'),
('Apartamento'),
('Comercial'),
('Terreno');
select * from endereco;
select * from paciente;
select * from agente;
select * from registro_atividade;
select * from medico;

INSERT INTO tipo_animal (nome_animal) VALUES
('Cachorro'),
('Gato'),
('Pássaro'),
('Outros');

-- ALTER TABLE endereco MODIFY bairro VARCHAR(100);
INSERT INTO gerentePosto (id, nome, telefone, cargo)
VALUES
(1, 'Marcos Almeida', '11987654321', 'Gerente Geral'),
(2, 'Ana Souza', '11987654322', 'Gerente Administrativo'),
(3, 'Carlos Oliveira', '11987654323', 'Gerente de Operações'),
(4, 'Fernanda Santos', '11987654324', 'Gerente Clínico'),
(5, 'Patricia Rodrigues', '11987654325', 'Gerente de Unidade');

INSERT INTO posto (nome_posto, telefone, email, horario_funcionamento, tipo_atendimento, capacidade, servicos_disponiveis, id_endereco, id_gerente)
VALUES 
('UBS São Marcos', '1142033689', 'ubs.saomarcos@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 250, 'Clínica Geral, Pediatria, Odontologia, Enfermagem', 11, 1),

('UBS Vista Alegre', '1147850155', 'ubs.vistaalegre@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 200, 'Clínica Geral, Pediatria, Ginecologia, Odontologia', 12, 2),

('UBS Jardim Independência', '1147043311', 'ubs.independencia@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 220, 'Clínica Geral, Pediatria, Odontologia, Enfermagem', 13, 3),

('UBS Ressaca', '1147045029', 'ubs.ressaca@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 180, 'Clínica Geral, Pediatria, Odontologia', 14, 4),

('UBS Centro', '1147043311', 'ubs.centro@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 300, 'Clínica Geral, Pediatria, Ginecologia, Odontologia, Enfermagem', 15, 5),

('UBS Itatuba', '1147856321', 'ubs.itatuba@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 200, 'Clínica Geral, Pediatria, Odontologia', 16, 6),

('UBS Jardim Nossa Senhora de Fátima', '1147856322', 'ubs.fatima@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 220, 'Clínica Geral, Pediatria, Odontologia, Enfermagem', 17, 7),

('UBS Pinheirinho', '1147856323', 'ubs.pinheirinho@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 250, 'Clínica Geral, Pediatria, Ginecologia, Odontologia', 18, 8),

('UBS Eufrásio Pereira Costa', '1147856324', 'ubs.eufrasio@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 180, 'Clínica Geral, Pediatria, Odontologia', 19, 9),

('UBS Santa Emília', '1147856325', 'ubs.santaemilia@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 200, 'Clínica Geral, Pediatria, Odontologia, Enfermagem', 20, 10),

('UBS Santo Eduardo', '1147856326', 'ubs.santoeduardo@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 300, 'Clínica Geral, Pediatria, Odontologia, Enfermagem', 21, 11),

('UBS Jardim São Luiz', '1147856327', 'ubs.saoluiz@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 220, 'Clínica Geral, Pediatria, Odontologia', 22, 12),

('UBS Santa Tereza', '1147856328', 'ubs.santatereza@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h', 'UBS', 200, 'Clínica Geral, Pediatria, Odontologia, Enfermagem', 23, 13),

('UPA Embu das Artes', '1147856329', 'upa.embu@saudeembu.sp.gov.br', '24 horas', 'UPA', 500, 'Urgência e Emergência, Clínica Médica, Pediatria', 24, 14),

('AMA Centro Embu', '1147856330', 'ama.centro@saudeembu.sp.gov.br', 'Seg-Sex 07h às 19h, Sáb 07h às 13h', 'AMA', 180, 'Atendimento Ambulatorial, Clínica Geral, Enfermagem', 25, 15);

INSERT INTO gerentePosto (id, nome, telefone, cargo)
VALUES
(6, 'João Pereira', '11987654326', 'Gerente de Unidade'),
(7, 'Luciana Costa', '11987654327', 'Gerente Administrativo'),
(8, 'Ricardo Gomes', '11987654328', 'Gerente Clínico'),
(9, 'Beatriz Fernandes', '11987654329', 'Gerente de Operações'),
(10, 'Daniel Rocha', '11987654330', 'Gerente Geral'),
(11, 'Camila Ribeiro', '11987654331', 'Gerente de Unidade'),
(12, 'Roberto Lima', '11987654332', 'Gerente Administrativo'),
(13, 'Juliana Martins', '11987654333', 'Gerente Clínico'),
(14, 'Paulo Araujo', '11987654334', 'Gerente de Operações'),
(15, 'Patrícia Nascimento', '11987654335', 'Gerente Geral');

SELECT * FROM medico WHERE id = 2;
