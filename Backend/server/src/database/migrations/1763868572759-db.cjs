/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1763868572759 {
    name = 'Db1763868572759'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`registro_atividade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_visita\` datetime NOT NULL, \`registro_visita\` varchar(255) NOT NULL, \`motivo\` enum ('Cadastramento/Atualização', 'Visita Periódica') NOT NULL, \`desfecho\` enum ('Visita realizada', 'Visita recusada', 'Ausente') NOT NULL, \`descricao\` text NULL, \`agenteId\` int NOT NULL, \`pacienteId\` int NOT NULL, \`enderecoId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_8e0d1a22c4bac624ba27495c826\` FOREIGN KEY (\`agenteId\`) REFERENCES \`agente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_7194d06a662eb8330a40d3eb3f4\` FOREIGN KEY (\`pacienteId\`) REFERENCES \`paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` ADD CONSTRAINT \`FK_5d0f51597f22ecd309bb7deb5b5\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_5d0f51597f22ecd309bb7deb5b5\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_7194d06a662eb8330a40d3eb3f4\``);
        await queryRunner.query(`ALTER TABLE \`registro_atividade\` DROP FOREIGN KEY \`FK_8e0d1a22c4bac624ba27495c826\``);
        await queryRunner.query(`DROP TABLE \`registro_atividade\``);
    }
}
