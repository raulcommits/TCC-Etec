/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1757381071719 {
    name = 'Db1757381071719'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`gerente_posto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`telefone\` varchar(15) NOT NULL, \`cargo\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`gerente_posto\``);
    }
}
