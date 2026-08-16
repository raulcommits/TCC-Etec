/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1764722495532 {
    name = 'Db1764722495532'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`responsavel_legal\` \`responsavel_legal\` varchar(70) NULL`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`paciente\` CHANGE \`responsavel_legal\` \`responsavel_legal\` varchar(70) NOT NULL`);
    }
}
