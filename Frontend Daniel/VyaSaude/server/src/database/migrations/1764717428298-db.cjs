/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1764717428298 {
    name = 'Db1764717428298'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_c473e2704f7fa1e2e2664204474\``);
        await queryRunner.query(`ALTER TABLE \`posto\` DROP COLUMN \`enderecoId\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP COLUMN \`registro_visita\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD \`registro_visita\` varchar(255) NOT NULL`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP COLUMN \`registro_visita\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD \`registro_visita\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD \`enderecoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_c473e2704f7fa1e2e2664204474\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
