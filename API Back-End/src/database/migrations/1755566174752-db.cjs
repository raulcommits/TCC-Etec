/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1755566174752 {
    name = 'Db1755566174752'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cpf\` varchar(11) NOT NULL, \`nome\` varchar(50) NOT NULL, \`senha\` varchar(14) NOT NULL, \`email\` varchar(40) NOT NULL, \`tipoUsuario\` enum ('admin', 'profissional', 'paciente') NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, UNIQUE INDEX \`IDX_28cd8597e57c8197d4929a98e7\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_28cd8597e57c8197d4929a98e7\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }
}
