/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1764819102486 {
    name = 'Db1764819102486'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_361f85f5d3c37799d76f1c178f6\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP COLUMN \`num_telefone\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP COLUMN \`cboCodigo\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD \`telefone\` varchar(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD \`profissao\` char(100) NOT NULL`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP COLUMN \`profissao\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP COLUMN \`telefone\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD \`cboCodigo\` varchar(4) NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD \`num_telefone\` varchar(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_361f85f5d3c37799d76f1c178f6\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
