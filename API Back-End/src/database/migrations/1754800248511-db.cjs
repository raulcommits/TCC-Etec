/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1754800248511 {
    name = 'Db1754800248511'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`profissional\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`cpf\` int NOT NULL, \`cbo\` varchar(6) NOT NULL, \`crm\` varchar(20) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`postoId\` int NOT NULL, UNIQUE INDEX \`IDX_cdd86bd77ca5e409ce1beb0a4b\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posto\` CHANGE \`servicos_disponiveis\` \`servicos_disponiveis\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`tipo_animal\` \`tipo_animal\` varchar(70) NULL`);
        await queryRunner.query(`ALTER TABLE \`profissional\` ADD CONSTRAINT \`FK_84f1632452593d46b9e2e9648f7\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`profissional\` DROP FOREIGN KEY \`FK_84f1632452593d46b9e2e9648f7\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`tipo_animal\` \`tipo_animal\` varchar(70) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`ponto_referencia\` \`ponto_referencia\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posto\` CHANGE \`servicos_disponiveis\` \`servicos_disponiveis\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_cdd86bd77ca5e409ce1beb0a4b\` ON \`profissional\``);
        await queryRunner.query(`DROP TABLE \`profissional\``);
    }
}
