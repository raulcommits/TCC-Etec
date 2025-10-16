/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1760576389847 {
    name = 'Db1760576389847'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`recepcao\` CHANGE \`email_institucional\` \`email\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`administrador\` CHANGE \`nome\` \`nome_admin\` varchar(100) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`paciente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(70) NOT NULL, \`nome_social\` varchar(70) NULL, \`cpf\` varchar(11) NOT NULL, \`sus\` char(15) NOT NULL, \`data_nascimento\` date NOT NULL, \`genero\` char(15) NOT NULL, \`etnia\` char(15) NOT NULL, \`estado_civil\` char(50) NOT NULL, \`nacionalidade\` char(15) NOT NULL, \`naturalidade_estado\` char(2) NOT NULL, \`naturalidade_municipio\` char(25) NOT NULL, \`filiacao_mae\` char(100) NOT NULL, \`filiacao_pai\` char(100) NOT NULL, \`num_telefone\` varchar(12) NOT NULL, \`email\` varchar(100) NOT NULL, \`escolaridade\` varchar(30) NOT NULL, \`nome_instituicao\` varchar(50) NOT NULL, \`tipo_instituicao\` varchar(50) NOT NULL, \`estado_clinico\` varchar(50) NOT NULL, \`leitura\` tinyint NOT NULL DEFAULT 1, \`escrita\` tinyint NOT NULL DEFAULT 1, \`responsavel_legal\` varchar(70) NOT NULL, \`inatividade\` datetime NULL, \`enderecoId\` int NOT NULL, \`agenteId\` int NULL, \`cboCodigo\` varchar(4) NULL, UNIQUE INDEX \`IDX_8eb9dba1cf8f89575da9a5cb6d\` (\`cpf\`), UNIQUE INDEX \`IDX_ec68662b30f6a2c0c85005893c\` (\`sus\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_94d801f15c37933d6283561083e\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_366a5401ec35a31e3a29db0908d\` FOREIGN KEY (\`agenteId\`) REFERENCES \`agente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_361f85f5d3c37799d76f1c178f6\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_361f85f5d3c37799d76f1c178f6\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_366a5401ec35a31e3a29db0908d\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_94d801f15c37933d6283561083e\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec68662b30f6a2c0c85005893c\` ON \`paciente\``);
        await queryRunner.query(`DROP INDEX \`IDX_8eb9dba1cf8f89575da9a5cb6d\` ON \`paciente\``);
        await queryRunner.query(`DROP TABLE \`paciente\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` CHANGE \`nome_admin\` \`nome\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recepcao\` CHANGE \`email\` \`email_institucional\` varchar(100) NOT NULL`);
    }
}
