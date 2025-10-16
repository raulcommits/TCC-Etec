/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1760576810882 {
    name = 'Db1760576810882'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`log_acesso\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`atividade\` text NOT NULL, \`logout\` datetime NULL, \`usuarioCpf\` char(11) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`log_acesso\` ADD CONSTRAINT \`FK_5db92bb0b51b1b2f8fc1ac38a9e\` FOREIGN KEY (\`usuarioCpf\`) REFERENCES \`usuario\`(\`cpf\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`log_acesso\` DROP FOREIGN KEY \`FK_5db92bb0b51b1b2f8fc1ac38a9e\``);
        await queryRunner.query(`DROP TABLE \`log_acesso\``);
    }
}
