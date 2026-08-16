drop database if exists vya_saude;
create database if not exists vya_saude;
use vya_saude;

#-----------------------------------------------------------------
# CONSULTAS:    
    
#TABELAS DE CHAVE PRIMÁRIA
select * from cbo;
select * from zona;
select * from usuario order by data_criacao ASC;
select * from gerente_posto;
select * from tipo_animal;
select * from tipo_imovel;
select * from material_predominante;
select * from registro_atividade;

# TABELAS DE CHAVE ESTRANGEIRA INDEPENDENTES
select * from endereco;
select * from posto;

# TABELAS DE CADASTRO
select * from usuario order by data_criacao ASC;
select * from administrador;
select * from gerente;
select * from agente;
select * from recepcao;
select * from medico;
select * from gerente_posto;
select * from paciente;
select * from log_acesso;
select * from log_login;
