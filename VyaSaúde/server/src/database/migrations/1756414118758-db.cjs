/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1756414118758 {
    name = 'Db1756414118758'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`registro_atividade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_visita\` datetime NOT NULL, \`observacoes\` text NULL, \`acoes_realizadas\` text NULL, \`profissionalId\` int NOT NULL, \`pacienteId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_e0be8603e6248e8ede93dec91f9\` FOREIGN KEY (\`profissionalId\`) REFERENCES \`profissional\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_7194d06a662eb8330a40d3eb3f4\` FOREIGN KEY (\`pacienteId\`) REFERENCES \`paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_7194d06a662eb8330a40d3eb3f4\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_e0be8603e6248e8ede93dec91f9\``);
        await queryRunner.query(`DROP TABLE \`registro_atividade\``);
    }
}
