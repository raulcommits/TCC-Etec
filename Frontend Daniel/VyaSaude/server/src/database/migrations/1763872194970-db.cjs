/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1763872194970 {
    name = 'Db1763872194970'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`data_criacao\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`data_exclusao\` datetime NULL`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`data_exclusao\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`data_criacao\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`deletedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }
}
