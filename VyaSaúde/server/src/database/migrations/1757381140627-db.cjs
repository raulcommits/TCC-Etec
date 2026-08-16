/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1757381140627 {
    name = 'Db1757381140627'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`endereco\` (\`id\` int NOT NULL AUTO_INCREMENT, \`logradouro\` varchar(100) NOT NULL, \`numero\` varchar(100) NOT NULL, \`complemento\` varchar(50) NOT NULL, \`bairro\` varchar(50) NOT NULL, \`cidade\` varchar(50) NOT NULL, \`estado\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'PN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL, \`cep\` varchar(10) NOT NULL, \`pais\` varchar(50) NOT NULL DEFAULT 'Brasil', \`ponto_referencia\` varchar(100) NULL, \`zonaId\` int NOT NULL, \`materialPredominanteId\` int NOT NULL, \`tipoImovelId\` int NOT NULL, \`tipoAnimalId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_89cb5d3f085ac253bb24c82574b\` FOREIGN KEY (\`zonaId\`) REFERENCES \`zona\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_7aaa115acccca30a4823a040ccf\` FOREIGN KEY (\`materialPredominanteId\`) REFERENCES \`material_predominante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_8679c042a7886c6aa79f59c4e49\` FOREIGN KEY (\`tipoImovelId\`) REFERENCES \`tipo_imovel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_5486b07bf03740743e091e6c745\` FOREIGN KEY (\`tipoAnimalId\`) REFERENCES \`tipo_animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_5486b07bf03740743e091e6c745\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_8679c042a7886c6aa79f59c4e49\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_7aaa115acccca30a4823a040ccf\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_89cb5d3f085ac253bb24c82574b\``);
        await queryRunner.query(`DROP TABLE \`endereco\``);
    }
}
