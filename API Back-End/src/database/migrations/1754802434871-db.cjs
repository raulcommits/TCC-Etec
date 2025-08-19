/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1754802434871 {
    name = 'Db1754802434871'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`paciente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cpf\` int NOT NULL, \`sus\` char(15) NOT NULL, \`nome\` varchar(70) NOT NULL, \`nome_social\` varchar(70) NULL, \`data_nascimento\` date NOT NULL, \`num_telefone\` varchar(15) NOT NULL, \`email\` varchar(100) NOT NULL, \`etnia\` char(15) NOT NULL, \`genero\` char(15) NOT NULL, \`escolaridade\` varchar(20) NOT NULL, \`nacionalidade\` char(15) NOT NULL, \`naturalidade_estado\` char(20) NOT NULL, \`naturalidade_municipio\` char(25) NOT NULL, \`estado_clinico\` varchar(10) NOT NULL, \`responsavel_legal\` varchar(5) NOT NULL, \`filiacao_mae\` char(100) NOT NULL, \`filiacao_pai\` char(100) NOT NULL, \`enderecoId\` int NOT NULL, \`profissionalId\` int NOT NULL, UNIQUE INDEX \`IDX_8eb9dba1cf8f89575da9a5cb6d\` (\`cpf\`), UNIQUE INDEX \`IDX_ec68662b30f6a2c0c85005893c\` (\`sus\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profissional\` CHANGE \`data_demissao\` \`data_demissao\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`posto\` CHANGE \`servicos_disponiveis\` \`servicos_disponiveis\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`tipo_animal\` \`tipo_animal\` varchar(70) NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_94d801f15c37933d6283561083e\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_0bc9a98435901937d1b9d207690\` FOREIGN KEY (\`profissionalId\`) REFERENCES \`profissional\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_0bc9a98435901937d1b9d207690\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_94d801f15c37933d6283561083e\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`tipo_animal\` \`tipo_animal\` varchar(70) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posto\` CHANGE \`servicos_disponiveis\` \`servicos_disponiveis\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profissional\` CHANGE \`data_demissao\` \`data_demissao\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_ec68662b30f6a2c0c85005893c\` ON \`paciente\``);
        await queryRunner.query(`DROP INDEX \`IDX_8eb9dba1cf8f89575da9a5cb6d\` ON \`paciente\``);
        await queryRunner.query(`DROP TABLE \`paciente\``);
    }
}
