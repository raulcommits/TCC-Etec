/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1756413728113 {
    name = 'Db1756413728113'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`posto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_posto\` varchar(100) NOT NULL, \`telefone\` varchar(15) NOT NULL, \`email\` varchar(100) NOT NULL, \`horario_funcionamento\` varchar(100) NOT NULL, \`tipo_atendimento\` enum ('UBS', 'UPA', 'AMA') NOT NULL, \`capacidade\` int NOT NULL, \`servicos_disponiveis\` text NULL, \`enderecoId\` int NOT NULL, \`responsavelId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_c473e2704f7fa1e2e2664204474\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_098db1109841c9b414ea050bb45\` FOREIGN KEY (\`responsavelId\`) REFERENCES \`responsavel_posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_098db1109841c9b414ea050bb45\``);
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_c473e2704f7fa1e2e2664204474\``);
        await queryRunner.query(`DROP TABLE \`posto\``);
    }
}
