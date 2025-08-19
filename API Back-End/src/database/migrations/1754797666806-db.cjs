/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1754797666806 {
    name = 'Db1754797666806'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`responsavel_posto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`telefone\` varchar(15) NOT NULL, \`cargo\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`responsavel_posto\``);
    }
}
