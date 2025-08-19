/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1754349589551 {
    name = 'Db1754349589551'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`endereco\` (\`id\` int NOT NULL AUTO_INCREMENT, \`logradouro\` varchar(100) NOT NULL, \`numero\` varchar(100) NOT NULL, \`complemento\` varchar(50) NOT NULL, \`bairro\` varchar(50) NOT NULL, \`cidade\` varchar(50) NOT NULL, \`estado\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'PN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL, \`cep\` varchar(10) NOT NULL, \`pais\` varchar(50) NOT NULL DEFAULT 'Brasil', \`ponto_referencia\` varchar(100) NULL, \`tipo_imovel\` int NOT NULL, \`material_predominante\` int NOT NULL, \`animal\` int NOT NULL, \`tipo_animal\` varchar(70) NULL, \`zonaId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_89cb5d3f085ac253bb24c82574b\` FOREIGN KEY (\`zonaId\`) REFERENCES \`zona\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_89cb5d3f085ac253bb24c82574b\``);
        await queryRunner.query(`DROP TABLE \`endereco\``);
    }
}
