/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1759187956146 {
    name = 'Db1759187956146'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`administrador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_789e78c62df228fa6e380b0009\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_b6b41cca4956bba5d7baea5247d\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_dd61fba7f45ba008dae74067718\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_dd61fba7f45ba008dae74067718\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_b6b41cca4956bba5d7baea5247d\``);
        await queryRunner.query(`DROP INDEX \`IDX_789e78c62df228fa6e380b0009\` ON \`administrador\``);
        await queryRunner.query(`DROP TABLE \`administrador\``);
    }
}
