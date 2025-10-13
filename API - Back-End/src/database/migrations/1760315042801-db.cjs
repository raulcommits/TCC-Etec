/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1760315042801 {
    name = 'Db1760315042801'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`recepcao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_recepcionista\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`email_institucional\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_d05831fccfffda35c56b3116e6\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`recepcao\` ADD CONSTRAINT \`FK_f17501844f68c143b91cc890329\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recepcao\` ADD CONSTRAINT \`FK_960fc6e8d4ad9b4e33655ee465d\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`recepcao\` DROP FOREIGN KEY \`FK_960fc6e8d4ad9b4e33655ee465d\``);
        await queryRunner.query(`ALTER TABLE \`recepcao\` DROP FOREIGN KEY \`FK_f17501844f68c143b91cc890329\``);
        await queryRunner.query(`DROP INDEX \`IDX_d05831fccfffda35c56b3116e6\` ON \`recepcao\``);
        await queryRunner.query(`DROP TABLE \`recepcao\``);
    }
}
