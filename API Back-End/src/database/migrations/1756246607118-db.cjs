/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1756246607118 {
    name = 'Db1756246607118'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tipo_imovel\` (\`id\` int NOT NULL, \`nome_imovel\` enum ('Casa', 'Apartamento', 'Comercial', 'Terreno') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`tipo_imovel\``);
    }
}
