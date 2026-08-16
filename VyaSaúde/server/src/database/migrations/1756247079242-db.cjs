/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1756247079242 {
    name = 'Db1756247079242'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tipo_animal\` (\`id\` int NOT NULL, \`nome_animal\` enum ('Cachorro', 'Gato', 'Pássaro', 'Outros') NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`tipo_animal\``);
    }
}
