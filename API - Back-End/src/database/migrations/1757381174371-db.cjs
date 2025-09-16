/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1757381174371 {
    name = 'Db1757381174371'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`posto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_posto\` varchar(100) NOT NULL, \`telefone\` varchar(15) NOT NULL, \`email\` varchar(100) NOT NULL, \`horario_funcionamento\` varchar(100) NOT NULL, \`tipo_atendimento\` enum ('UBS', 'UPA', 'AMA') NOT NULL, \`capacidade\` int NOT NULL, \`servicos_disponiveis\` text NULL, \`enderecoId\` int NOT NULL, \`gerenteId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_c473e2704f7fa1e2e2664204474\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_a8ab8d4019d0f08fdb8d6b1f0bc\` FOREIGN KEY (\`gerenteId\`) REFERENCES \`gerente_posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_a8ab8d4019d0f08fdb8d6b1f0bc\``);
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_c473e2704f7fa1e2e2664204474\``);
        await queryRunner.query(`DROP TABLE \`posto\``);
    }
}
