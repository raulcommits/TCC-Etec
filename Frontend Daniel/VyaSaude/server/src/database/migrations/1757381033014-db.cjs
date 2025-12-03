/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1757381033014 {
    name = 'Db1757381033014'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tipo_animal\` (\`id\` int NOT NULL, \`nome_animal\` enum ('Cachorro', 'Gato', 'Pássaro', 'Outros') NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`tipo_animal\``);
    }
}
