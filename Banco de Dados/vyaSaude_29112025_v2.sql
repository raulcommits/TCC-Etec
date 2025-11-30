drop database vyasaude_26102025;
CREATE DATABASE vyaSaude_26102025;
USE vyaSaude_26102025;

-- Tabela usuario
CREATE TABLE usuario (
    cpf CHAR(11) PRIMARY KEY,
    nome VARCHAR(50),
    senha VARCHAR(30),
    email VARCHAR(50),
    telefone VARCHAR(15), -- ADICIONADO para compatibilidade com inserts
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
    complemento VARCHAR(6),
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
    telefone VARCHAR(15),
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

/* inserção de dados 29/11/2025 */
-- 1. Inserir dados básicos
INSERT INTO zona (bairro, unidade_administrativa, regiao)
VALUES ('Centro', 'Unidade 1', 'Sul');

INSERT INTO material_predominante (nome_material)
VALUES ('Alvenaria'), ('Madeira');

INSERT INTO tipo_imovel (nome_imovel)
VALUES ('Casa'), ('Apartamento');

INSERT INTO tipo_animal (nome_animal)
VALUES ('Cachorro'), ('Gato');

-- 2. Inserir endereços
INSERT INTO endereco (
    logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia,
    id_zona, id_material, id_tipo_imovel
) VALUES (
    'Rua das Flores', 123, 'Apto 1', 'Centro', 'São Paulo', 'SP', '12345678', 'Brasil', 'Próximo à praça',
    1, 1, 1
);

INSERT INTO endereco (
    logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia,
    id_zona, id_material, id_tipo_imovel
) VALUES (
    'Avenida Brasil', 456, 'Bloco B', 'Jardim', 'São Paulo', 'SP', '87654321', 'Brasil', 'Perto da escola',
    1, 2, 2
);

alter table endereco modify complemento varchar(20);

-- 3. Inserir usuários (pacientes + funcionários)
INSERT INTO usuario (cpf, nome, senha, email, telefone, tipoUsuario, createdAt)
VALUES ('47332687142', 'Ana Laura Teixeira', 'senha123', 'ana@example.org', '(081)3822-7675', 'paciente', NOW());

INSERT INTO usuario (cpf, nome, senha, email, telefone, tipoUsuario, createdAt)
VALUES ('12345678901', 'Carlos Silva', 'senha456', 'carlos@example.org', '(011)91234-5678', 'paciente', NOW());

INSERT INTO usuario (cpf, nome, senha, email, telefone, tipoUsuario, createdAt)
VALUES ('11122233344', 'Joana Pereira', 'senha789', 'joana@example.org', '(011)95555-1111', 'recepcao', NOW());

INSERT INTO usuario (cpf, nome, senha, email, telefone, tipoUsuario, createdAt)
VALUES ('55566677788', 'Rafael Gomes', 'senha321', 'rafael@example.org', '(011)97777-2222', 'agente', NOW());

-- 4. Inserir pacientes
INSERT INTO paciente (
    nome, nome_social, cpf, sus, data_nascimento, genero, etnia, estado_civil,
    nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae,
    filiacao_pai, telefone, email, escolaridade, nome_instituicao, tipo_instituicao,
    estado_clinico, leitura, escrita, responsavel_legal, inatividade, id_endereco
) VALUES (
    'Ana Laura Teixeira','Ana Novaes','47332687142','329966053505838','1966-04-17',
    'Feminino','Branco','Casado','Brasileiro','SP','Embu das Artes','Júlia Porto',
    'Felipe Azevedo','(081)3822-7675','ana@example.org','Médio','Pastor',
    'Pública','Crítico','Sim','Não','Dr. Ravi Lopes','2025-08-17 20:40:07',1
);

INSERT INTO paciente (
    nome, nome_social, cpf, sus, data_nascimento, genero, etnia, estado_civil,
    nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae,
    filiacao_pai, telefone, email, escolaridade, nome_instituicao, tipo_instituicao,
    estado_clinico, leitura, escrita, responsavel_legal, inatividade, id_endereco
) VALUES (
    'Carlos Silva','Carlão','12345678901','987654321000000','1980-05-10',
    'Masculino','Pardo','Solteiro','Brasileiro','SP','São Paulo','Maria Silva',
    'João Silva','(011)91234-5678','carlos@example.org','Superior','USP',
    'Privada','Estável','Sim','Sim','Maria Silva','2025-08-17 20:40:07',2
);

-- 5. Inserir médico
INSERT INTO medico (nome_medico, crm, cpf, data_admissao, email, telefone)
VALUES ('Dr. Pedro Almeida', 'CRM12345', '98765432100', '2020-01-15', 'pedro@example.org', '(011)99876-5432');

-- 6. Inserir gerente de posto
INSERT INTO gerentePosto (nome, telefone, cargo)
VALUES ('Mariana Souza', '(011)91234-0000', 'Gerente Geral');

-- 7. Inserir posto de saúde
INSERT INTO posto (
    nome_posto, telefone, email, horario_funcionamento, tipo_atendimento,
    capacidade, servicos_disponiveis, id_endereco, id_gerente
) VALUES (
    'UBS Jardim das Flores', '(011)4002-8922', 'ubsjardim@example.org',
    'Seg-Sex 08h-18h', 'UBS', 200, 'Clínico geral, pediatria, vacinação',
    1, 1
);

-- 8. Inserir recepcionista
INSERT INTO recepcao (nome_recepcionista, cpf, data_admissao, email, telefone)
VALUES ('Joana Pereira', '11122233344', '2022-03-01', 'joana@example.org', '(011)95555-1111');

-- 9. Inserir agente de saúde
INSERT INTO agente (nome_admin, cpf, data_admissao, email, telefone, codigo_cbo)
VALUES ('Rafael Gomes', '55566677788', '2021-05-10', 'rafael@example.org', '(011)97777-2222', 2235);

-- 10. Inserir registro de atividade
INSERT INTO registro_atividade (
    data_visita, motivo, desfecho, descricao, id_tipo_animal, id_paciente, id_medico
) VALUES (
    NOW(), 'Cadastramento/Atualização', 'Alta', 'Primeira consulta de rotina',
    1, 1, 1
);
INSERT INTO usuario (cpf, nome, senha, email, telefone, tipoUsuario, createdAt)
VALUES ('55566677788', 'Rafael Gomes', 'senha321', 'rafael@example.org', '(011)97777-2222', 'agente', NOW());
INSERT INTO agente (nome, cpf, data_admissao, email, telefone, codigo_cbo)
VALUES ('Rafael Gomes', '55566677788', '2021-05-10', 'rafael@example.org', '(011)97777-2222', 2235);

select * from agente;
SELECT id, logradouro, bairro, cidade FROM endereco;
INSERT INTO endereco (
    logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia,
    id_zona, id_material, id_tipo_imovel
) VALUES (
    'Rua Nova Esperança', 809, 'Casa 1', 'Centro', 'São Paulo', 'SP', '11223344', 'Brasil', 'Próximo ao mercado',
    1, 1, 1
);
SELECT id FROM endereco WHERE logradouro = 'Rua Nova Esperança' AND numero = 809;
INSERT INTO paciente (
    nome, nome_social, cpf, sus, data_nascimento, genero, etnia, estado_civil,
    nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae,
    filiacao_pai, telefone, email, escolaridade, nome_instituicao, tipo_instituicao,
    estado_clinico, leitura, escrita, responsavel_legal, inatividade, id_endereco
) VALUES (
    'Ana Laura Teixeira','Ana Novaes','47332687142','329966053505838','1966-04-17',
    'Feminino','Branco','Casado','Brasileiro','SP','Embu das Artes','Júlia Porto',
    'Felipe Azevedo','(081)3822-7675','almeidaerick@example.org','Médio','Pastor',
    'Pública','Crítico','Sim','Não','Dr. Ravi Lopes','2025-08-17 20:40:07', <id_endereco_correto>
);

select * from paciente;
TRUNCATE TABLE usuario;
TRUNCATE TABLE administrador;
TRUNCATE TABLE agente;
TRUNCATE TABLE paciente;
TRUNCATE TABLE endereco;

select * from tipo_animal;
-- Atualiza os IDs duplicados para valores corretos
UPDATE tipo_animal SET id = 3 WHERE nome_animal = 'Pássaro';
UPDATE tipo_animal SET id = 4 WHERE nome_animal = 'Outros';
INSERT INTO tipo_animal (nome_animal) VALUES
('Cachorro'),
('Gato'),
('Pássaro'),
('Outros');

INSERT INTO medico (nome_medico, crm, cpf, data_admissao, email, telefone)
VALUES
('Dr. João Silva', 'CRM12345', '30000000001', '2018-01-01', 'joao.silva@hospital.com', '11988880001'),
('Dra. Maria Oliveira', 'CRM12346', '30000000002', '2019-03-15', 'maria.oliveira@hospital.com', '11988880002'),
('Dr. Carlos Souza', 'CRM12347', '30000000003', '2020-05-20', 'carlos.souza@hospital.com', '11988880003'),
('Dra. Fernanda Santos', 'CRM12348', '30000000004', '2021-07-10', 'fernanda.santos@hospital.com', '11988880004'),
('Dr. Paulo Almeida', 'CRM12349', '30000000005', '2017-09-25', 'paulo.almeida@hospital.com', '11988880005'),
('Dra. Juliana Costa', 'CRM12350', '30000000006', '2016-11-30', 'juliana.costa@hospital.com', '11988880006'),
('Dr. Ricardo Martins', 'CRM12351', '30000000007', '2015-02-12', 'ricardo.martins@hospital.com', '11988880007'),
('Dra. Camila Rocha', 'CRM12352', '30000000008', '2014-04-18', 'camila.rocha@hospital.com', '11988880008'),
('Dr. André Pereira', 'CRM12353', '30000000009', '2013-06-22', 'andre.pereira@hospital.com', '11988880009'),
('Dra. Beatriz Lima', 'CRM12354', '30000000010', '2012-08-05', 'beatriz.lima@hospital.com', '11988880010');

INSERT INTO registro_atividade (data_visita, motivo, desfecho, descricao, id_tipo_animal, id_paciente, id_medico)
VALUES
('2025-01-10 09:30:00', 'Cadastramento/Atualização', 'Concluído', 'Primeira visita domiciliar para cadastro do paciente.', 1, 1, 1),
('2025-02-15 14:00:00', 'Visita Periódica', 'Encaminhado', 'Paciente apresentou sintomas leves, encaminhado para consulta médica.', 2, 2, 3),
('2025-03-20 10:15:00', 'Visita Periódica', 'Alta', 'Paciente em bom estado clínico, liberado sem necessidade de acompanhamento.', 3, 3, 2),
('2025-04-05 16:45:00', 'Cadastramento/Atualização', 'Pendente', 'Cadastro realizado, aguardando documentação complementar.', 4, 4, 4),
('2025-05-12 11:20:00', 'Visita Periódica', 'Concluído', 'Visita domiciliar para acompanhamento de tratamento contínuo.', 1, 5, 5),
('2025-06-18 08:50:00', 'Visita Periódica', 'Encaminhado', 'Paciente com sinais de febre, encaminhado ao posto de saúde.', 2, 6, 6),
('2025-07-22 15:30:00', 'Cadastramento/Atualização', 'Concluído', 'Atualização cadastral realizada com sucesso.', 3, 7, 7),
('2025-08-30 13:10:00', 'Visita Periódica', 'Alta', 'Paciente apresentou melhora significativa, liberado do acompanhamento.', 1, 8, 8),
('2025-09-05 17:40:00', 'Visita Periódica', 'Pendente', 'Paciente não estava presente no domicílio, visita reagendada.', 4, 9, 9),
('2025-10-11 09:00:00', 'Cadastramento/Atualização', 'Concluído', 'Cadastro realizado para novo morador.', 2, 10, 10);

select * from registro_atividade;