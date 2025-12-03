/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1764550650234 {
    name = 'Db1764550650234'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`complemento\` \`complemento\` varchar(50) NULL`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`complemento\` \`complemento\` varchar(50) NOT NULL`);
    }
}
