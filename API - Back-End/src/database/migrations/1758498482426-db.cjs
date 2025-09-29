/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1758498482426 {
    name = 'Db1758498482426'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`registro_atividade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_visita\` datetime NOT NULL, \`observacoes\` text NULL, \`acoes_realizadas\` text NULL, \`agenteId\` int NOT NULL, \`pacienteId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_8e0d1a22c4bac624ba27495c826\` FOREIGN KEY (\`agenteId\`) REFERENCES \`agente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_7194d06a662eb8330a40d3eb3f4\` FOREIGN KEY (\`pacienteId\`) REFERENCES \`paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_7194d06a662eb8330a40d3eb3f4\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_8e0d1a22c4bac624ba27495c826\``);
        await queryRunner.query(`DROP TABLE \`registro_atividade\``);
    }
}
