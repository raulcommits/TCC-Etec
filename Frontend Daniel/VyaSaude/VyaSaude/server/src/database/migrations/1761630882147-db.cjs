/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1761630882147 {
    name = 'Db1761630882147'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`registro_atividade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_visita\` datetime NOT NULL, \`registro_visita\` text NOT NULL, \`motivo\` enum ('Cadastramento/Atualização', 'Visita Periódica') NOT NULL, \`desfecho\` enum ('Visita realizada', 'Visita recusada', 'Ausente') NOT NULL, \`descricao\` text NULL, \`agenteId\` int NOT NULL, \`pacienteId\` int NOT NULL, \`enderecoId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recepcao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_recepcionista\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_d05831fccfffda35c56b3116e6\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medico\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_medico\` varchar(100) NOT NULL, \`crm\` varchar(6) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_d5be975f1bf80b79b268a3e5dc\` (\`crm\`), UNIQUE INDEX \`IDX_d1541dc30c56eb55ade1530a33\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`log_acesso\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`atividade\` text NOT NULL, \`logout\` datetime NULL, \`usuarioCpf\` char(11) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`administrador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_admin\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_789e78c62df228fa6e380b0009\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`agente\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`agente\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD \`inatividade\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`agente\` ADD \`nome_agente\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`tipo_animal\` CHANGE \`nome_animal\` \`nome_animal\` enum ('Cachorro', 'Gato', 'Pássaro', 'Outros') NULL`);
        await queryRunner.query(`ALTER TABLE \`posto\` CHANGE \`servicos_disponiveis\` \`servicos_disponiveis\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_366a5401ec35a31e3a29db0908d\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_361f85f5d3c37799d76f1c178f6\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`nome_social\` \`nome_social\` varchar(70) NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`filiacao_mae\` \`filiacao_mae\` char(100) NOT NULL DEFAULT 'Desconhecido'`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`filiacao_pai\` \`filiacao_pai\` char(100) NOT NULL DEFAULT 'Desconhecido'`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`agenteId\` \`agenteId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`cboCodigo\` \`cboCodigo\` varchar(4) NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_5486b07bf03740743e091e6c745\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`tipoAnimalId\` \`tipoAnimalId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`agente\` CHANGE \`data_demissao\` \`data_demissao\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_8e0d1a22c4bac624ba27495c826\` FOREIGN KEY (\`agenteId\`) REFERENCES \`agente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_7194d06a662eb8330a40d3eb3f4\` FOREIGN KEY (\`pacienteId\`) REFERENCES \`paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_5d0f51597f22ecd309bb7deb5b5\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recepcao\` ADD CONSTRAINT \`FK_f17501844f68c143b91cc890329\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recepcao\` ADD CONSTRAINT \`FK_960fc6e8d4ad9b4e33655ee465d\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_366a5401ec35a31e3a29db0908d\` FOREIGN KEY (\`agenteId\`) REFERENCES \`agente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_361f85f5d3c37799d76f1c178f6\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD CONSTRAINT \`FK_73054e9377a02e69631e32d5eb1\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD CONSTRAINT \`FK_74ec2a91d551c73333b907bde27\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`log_acesso\` ADD CONSTRAINT \`FK_5db92bb0b51b1b2f8fc1ac38a9e\` FOREIGN KEY (\`usuarioCpf\`) REFERENCES \`usuario\`(\`cpf\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_5486b07bf03740743e091e6c745\` FOREIGN KEY (\`tipoAnimalId\`) REFERENCES \`tipo_animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_b6b41cca4956bba5d7baea5247d\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_dd61fba7f45ba008dae74067718\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_dd61fba7f45ba008dae74067718\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_b6b41cca4956bba5d7baea5247d\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_5486b07bf03740743e091e6c745\``);
        await queryRunner.query(`ALTER TABLE \`log_acesso\` DROP FOREIGN KEY \`FK_5db92bb0b51b1b2f8fc1ac38a9e\``);
        await queryRunner.query(`ALTER TABLE \`medico\` DROP FOREIGN KEY \`FK_74ec2a91d551c73333b907bde27\``);
        await queryRunner.query(`ALTER TABLE \`medico\` DROP FOREIGN KEY \`FK_73054e9377a02e69631e32d5eb1\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_361f85f5d3c37799d76f1c178f6\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_366a5401ec35a31e3a29db0908d\``);
        await queryRunner.query(`ALTER TABLE \`recepcao\` DROP FOREIGN KEY \`FK_960fc6e8d4ad9b4e33655ee465d\``);
        await queryRunner.query(`ALTER TABLE \`recepcao\` DROP FOREIGN KEY \`FK_f17501844f68c143b91cc890329\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_5d0f51597f22ecd309bb7deb5b5\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_7194d06a662eb8330a40d3eb3f4\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_8e0d1a22c4bac624ba27495c826\``);
        await queryRunner.query(`ALTER TABLE \`agente\` CHANGE \`data_demissao\` \`data_demissao\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`tipoAnimalId\` \`tipoAnimalId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_5486b07bf03740743e091e6c745\` FOREIGN KEY (\`tipoAnimalId\`) REFERENCES \`tipo_animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`cboCodigo\` \`cboCodigo\` varchar(4) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`agenteId\` \`agenteId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`filiacao_pai\` \`filiacao_pai\` char(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`filiacao_mae\` \`filiacao_mae\` char(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`nome_social\` \`nome_social\` varchar(70) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_361f85f5d3c37799d76f1c178f6\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_366a5401ec35a31e3a29db0908d\` FOREIGN KEY (\`agenteId\`) REFERENCES \`agente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posto\` CHANGE \`servicos_disponiveis\` \`servicos_disponiveis\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tipo_animal\` CHANGE \`nome_animal\` \`nome_animal\` enum ('Cachorro', 'Gato', 'Pássaro', 'Outros') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`agente\` DROP COLUMN \`nome_agente\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP COLUMN \`inatividade\``);
        await queryRunner.query(`ALTER TABLE \`agente\` ADD \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`agente\` ADD \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_789e78c62df228fa6e380b0009\` ON \`administrador\``);
        await queryRunner.query(`DROP TABLE \`administrador\``);
        await queryRunner.query(`DROP TABLE \`log_acesso\``);
        await queryRunner.query(`DROP INDEX \`IDX_d1541dc30c56eb55ade1530a33\` ON \`medico\``);
        await queryRunner.query(`DROP INDEX \`IDX_d5be975f1bf80b79b268a3e5dc\` ON \`medico\``);
        await queryRunner.query(`DROP TABLE \`medico\``);
        await queryRunner.query(`DROP INDEX \`IDX_d05831fccfffda35c56b3116e6\` ON \`recepcao\``);
        await queryRunner.query(`DROP TABLE \`recepcao\``);
        await queryRunner.query(`DROP TABLE \`registro_atividade\``);
    }
}
