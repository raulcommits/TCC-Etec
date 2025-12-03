/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1758405737170 {
    name = 'Db1758405737170'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`posto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_posto\` varchar(100) NOT NULL, \`telefone\` varchar(15) NOT NULL, \`email\` varchar(100) NOT NULL, \`horario_funcionamento\` varchar(100) NOT NULL, \`tipo_atendimento\` enum ('UBS', 'UPA', 'AMA') NOT NULL, \`capacidade\` int NOT NULL, \`servicos_disponiveis\` text NULL, \`enderecoId\` int NOT NULL, \`gerenteId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`paciente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(70) NOT NULL, \`nome_social\` varchar(70) NULL, \`cpf\` varchar(11) NOT NULL, \`sus\` char(15) NOT NULL, \`data_nascimento\` date NOT NULL, \`genero\` char(15) NOT NULL, \`etnia\` char(15) NOT NULL, \`estado_civil\` char(50) NOT NULL, \`nacionalidade\` char(15) NOT NULL, \`naturalidade_estado\` char(2) NOT NULL, \`naturalidade_municipio\` char(25) NOT NULL, \`filiacao_mae\` char(100) NOT NULL, \`filiacao_pai\` char(100) NOT NULL, \`num_telefone\` varchar(12) NOT NULL, \`email\` varchar(100) NOT NULL, \`escolaridade\` varchar(30) NOT NULL, \`nome_instituicao\` varchar(50) NOT NULL, \`tipo_instituicao\` varchar(50) NOT NULL, \`estado_clinico\` varchar(50) NOT NULL, \`leitura\` tinyint NOT NULL DEFAULT 1, \`escrita\` tinyint NOT NULL DEFAULT 1, \`responsavel_legal\` varchar(70) NOT NULL, \`enderecoId\` int NOT NULL, \`agenteId\` int NOT NULL, \`cboCodigo\` varchar(4) NULL, UNIQUE INDEX \`IDX_8eb9dba1cf8f89575da9a5cb6d\` (\`cpf\`), UNIQUE INDEX \`IDX_ec68662b30f6a2c0c85005893c\` (\`sus\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`deletedAt\` datetime NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_2f2c3586fce5c147529ea4c62c\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`tipoUsuario\` \`tipoUsuario\` enum ('admin', 'agente', 'paciente', 'recepcao', 'gerente') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`tipo_animal\` CHANGE \`nome_animal\` \`nome_animal\` enum ('Cachorro', 'Gato', 'Pássaro', 'Outros') NULL`);
        await queryRunner.query(`ALTER TABLE \`material_predominante\` CHANGE \`nome_material\` \`nome_material\` enum ('Alvenaria', 'Madeira', 'Misto', 'Pré-fabricado') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`estado\` \`estado\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_c473e2704f7fa1e2e2664204474\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_a8ab8d4019d0f08fdb8d6b1f0bc\` FOREIGN KEY (\`gerenteId\`) REFERENCES \`gerente_posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_94d801f15c37933d6283561083e\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_366a5401ec35a31e3a29db0908d\` FOREIGN KEY (\`agenteId\`) REFERENCES \`agente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_361f85f5d3c37799d76f1c178f6\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agente\` ADD CONSTRAINT \`FK_40907f95c5121fc162290b31b3c\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agente\` ADD CONSTRAINT \`FK_d6d44ad411b559d64c1bc99b84b\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`agente\` DROP FOREIGN KEY \`FK_d6d44ad411b559d64c1bc99b84b\``);
        await queryRunner.query(`ALTER TABLE \`agente\` DROP FOREIGN KEY \`FK_40907f95c5121fc162290b31b3c\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_361f85f5d3c37799d76f1c178f6\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_366a5401ec35a31e3a29db0908d\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_94d801f15c37933d6283561083e\``);
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_a8ab8d4019d0f08fdb8d6b1f0bc\``);
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_c473e2704f7fa1e2e2664204474\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`estado\` \`estado\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'PN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`material_predominante\` CHANGE \`nome_material\` \`nome_material\` enum ('Alvenaria', 'Madeira', 'Misto', 'Pre_fabricado') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tipo_animal\` CHANGE \`nome_animal\` \`nome_animal\` enum ('Cachorro', 'Gato', 'Pássaro', 'Outros') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`deletedAt\` \`deletedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`tipoUsuario\` \`tipoUsuario\` enum ('admin', 'Agente', 'paciente', 'recepcao') NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_2f2c3586fce5c147529ea4c62c\` ON \`agente\``);
        await queryRunner.query(`DROP TABLE \`agente\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec68662b30f6a2c0c85005893c\` ON \`paciente\``);
        await queryRunner.query(`DROP INDEX \`IDX_8eb9dba1cf8f89575da9a5cb6d\` ON \`paciente\``);
        await queryRunner.query(`DROP TABLE \`paciente\``);
        await queryRunner.query(`DROP TABLE \`posto\``);
    }
}
