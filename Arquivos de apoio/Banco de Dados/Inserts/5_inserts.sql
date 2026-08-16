/* INSERT ENDEREÇOS*/
insert into endereco(id, logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia, zonaId, materialPredominanteId, tipoImovelId, tipoAnimalId) values
(1, "Rua São Bernardo", 390, "Casa", "Jardim São Marcos", "Embu das Artes", "SP", "06814090", "Brasil", null, 3, 3, 1, 2),
(2, "Rua Marcelino Pinto Teixeira", 529, "Etec de Embu", "Gramado", "Embu das Artes", "SP", "06816000", "Brasil",  "Câmara Municipal",  15, 1, 3, null),
(3, "Rua Marechal Izidoro Lopes", 1681, null, "Centro", "Embu das Artes", "SP", "06803480", "Brasil", "Pronto Socorro Central",  10, 1, 3, null);


/* INSERT USUARIOS (um pra cada tipo)*/
insert into usuario (cpf, nome, senha, email, tipoUsuario) values  							
("12345678901", "Admin", "123456789", "admin@teste.com", "admin"),
("12345678902", "Gerente", "123456789", "gerente@teste.com", "gerente"),
("12345678903", "Agente", "123456789", "agente@teste.com", "agente"),
("12345678904", "Recepcao", "123456789", "recepcao@teste.com", "recepcao"),
("12345678905", "Paciente", "123456789", "paciente@teste.com", "paciente"),
("09432174312", "José Augusto Bonifácio", "123456789", "joseaugusto@gmail.com", "agente"), /* Insert anterior*/
("54545454545", "Raul", "123456789", "raul@teste.com", "paciente");


/* INSERT ADMIN */
insert into administrador(nome_admin, cpf, data_admissao, email, telefone, postoId, cboCodigo) values
("Admin", "12345678901", "2018-10-03", "admin@teste.com", "11983265784", 1, 1312);


/* INSERT AGENTE */
insert into agente(nome_agente, cpf, data_admissao, email, telefone, postoId, cboCodigo) values
("Agente", "12345678903", "2018-10-03", "agente@teste.com", "11983265784", 1, 5151),
("José Augusto Bonifácio", "09432174312", "2018-10-03", "joseaugusto@gmail.com", "11983265783", 1, 5151);


/* INSERT RECEPCAO */


/* INSERT PACIENTE */
insert into paciente (nome, nome_social, cpf, sus, data_nascimento, genero, etnia, estado_civil,
	nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae, filiacao_pai, telefone, email, escolaridade, nome_instituicao, tipo_instituicao, estado_clinico, leitura, escrita, responsavel_legal, enderecoId, agenteId) values 	
("Paciente", null, "12345678905", "123456789056701", "2004-11-02", "Masculino", "Pardo", "Solteiro", "Brasileiro", "SP", "São Paulo", "Mãe", "Pai", 
	1140028922, "paciente@teste.com", "Ensino Médio Completo", "E.E. Embu N", "Escola Pública", "Saudável", 1, 1, "Independente", 1, 1),

("Raul", null, "54545454545", "123456789012345", "2004-11-02", "Masculino", "Pardo", "Solteiro", "Brasileiro", "SP", "São Paulo", "Mãe", "Pai", 
	1140028922, "raul@teste.com", "Ensino Médio Completo", "E.E. Embu N", "Escola Pública", "Saudável", 1, 1, "Independente", 1, 1);
    