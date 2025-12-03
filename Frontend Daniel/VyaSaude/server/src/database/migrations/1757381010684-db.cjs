/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1757381010684 {
    name = 'Db1757381010684'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`material_predominante\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_material\` enum ('Alvenaria', 'Madeira', 'Misto', 'Pre_fabricado') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`material_predominante\``);
    }
}
