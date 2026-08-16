create database vyaSaude_26102025;
use vyaSaude_26102025;

-- Tabela usuario
CREATE TABLE usuario (
    cpf CHAR(11) PRIMARY KEY,
    nome VARCHAR(50),
    senha VARCHAR(30),
    email VARCHAR(50),
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
        
		



    
    
	