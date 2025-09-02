/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1756765289082 {
    name = 'Db1756765289082'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`profissional\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`crm\` varchar(20) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`deletedAt\` datetime NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_cdd86bd77ca5e409ce1beb0a4b\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profissional\` ADD CONSTRAINT \`FK_84f1632452593d46b9e2e9648f7\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profissional\` ADD CONSTRAINT \`FK_fc455500f42bbb27aa56cc311ab\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`profissional\` DROP FOREIGN KEY \`FK_fc455500f42bbb27aa56cc311ab\``);
        await queryRunner.query(`ALTER TABLE \`profissional\` DROP FOREIGN KEY \`FK_84f1632452593d46b9e2e9648f7\``);
        await queryRunner.query(`DROP INDEX \`IDX_cdd86bd77ca5e409ce1beb0a4b\` ON \`profissional\``);
        await queryRunner.query(`DROP TABLE \`profissional\``);
    }
}
