/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1757380923664 {
    name = 'Db1757380923664'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`zona\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bairro\` varchar(35) NOT NULL, \`unidade_administrativa\` varchar(35) NOT NULL, \`regiao\` varchar(10) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`zona\``);
    }
}
