create database tcc_pep_2025;
use tcc_pep_2025;

create table paciente (
   cpf char(11) primary key,
   sus char(15),
   id_paciente char(5) primary key auto_increment,
   data_nascimento date,
   etnia char(15),  #verificar o tipo de dado (se é var ou string)
   gênero char(25), 
   escolaridade varchar(20),
   nacionalidade char(15),
   naturalidade_estado char(20),
   naturalidade_municipio char(25),
   profissão varchar(4),			#criar um json de CBO
   estado_clinico varchar(10) foreign key,			#ESTADO CLINICO
   responsável_legal
   filiacao_mae
   filiacao_pai
   endereços (fk)


	
