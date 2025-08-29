/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1756246647292 {
    name = 'Db1756246647292'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`material_predominante\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_material\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`material_predominante\``);
    }
}
