/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1756246203214 {
    name = 'Db1756246203214'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`zona\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_zona\` enum ('Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Zona Central') NOT NULL, \`descricao\` enum ('Região Norte de Embu das Artes', 'Região Sul de Embu das Artes', 'Região Leste de Embu das Artes', 'Região Oeste de Embu das Artes', 'Região Central de Embu das Artes') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`zona\``);
    }
}
