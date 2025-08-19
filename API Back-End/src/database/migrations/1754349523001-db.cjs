/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1754349523001 {
    name = 'Db1754349523001'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`zona\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` enum ('Urbana', 'Rural', 'Indigena') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`zona\``);
    }
}
