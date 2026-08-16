/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1757380851033 {
    name = 'Db1757380851033'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`cpf\` char(11) NOT NULL, \`nome\` varchar(50) NOT NULL, \`senha\` varchar(14) NOT NULL, \`email\` varchar(80) NOT NULL, \`tipoUsuario\` enum ('admin', 'Agente', 'paciente', 'recepcao') NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`cpf\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }
}
