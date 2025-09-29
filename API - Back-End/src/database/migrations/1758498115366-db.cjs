/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1758498115366 {
    name = 'Db1758498115366'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD \`postoId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD \`cboCodigo\` varchar(4) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_b6b41cca4956bba5d7baea5247d\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`administrador\` ADD CONSTRAINT \`FK_dd61fba7f45ba008dae74067718\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_dd61fba7f45ba008dae74067718\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP FOREIGN KEY \`FK_b6b41cca4956bba5d7baea5247d\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP COLUMN \`cboCodigo\``);
        await queryRunner.query(`ALTER TABLE \`administrador\` DROP COLUMN \`postoId\``);
    }
}
