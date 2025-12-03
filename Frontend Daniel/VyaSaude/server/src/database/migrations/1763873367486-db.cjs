/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1763873367486 {
    name = 'Db1763873367486'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` CHANGE \`data_visita\` \`data_visita\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` CHANGE \`data_visita\` \`data_visita\` datetime NOT NULL`);
    }
}
