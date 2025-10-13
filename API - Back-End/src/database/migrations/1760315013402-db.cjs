/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1760315013402 {
    name = 'Db1760315013402'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`agente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_agente\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_2f2c3586fce5c147529ea4c62c\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`agente\` ADD CONSTRAINT \`FK_40907f95c5121fc162290b31b3c\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agente\` ADD CONSTRAINT \`FK_d6d44ad411b559d64c1bc99b84b\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`agente\` DROP FOREIGN KEY \`FK_d6d44ad411b559d64c1bc99b84b\``);
        await queryRunner.query(`ALTER TABLE \`agente\` DROP FOREIGN KEY \`FK_40907f95c5121fc162290b31b3c\``);
        await queryRunner.query(`DROP INDEX \`IDX_2f2c3586fce5c147529ea4c62c\` ON \`agente\``);
        await queryRunner.query(`DROP TABLE \`agente\``);
    }
}
