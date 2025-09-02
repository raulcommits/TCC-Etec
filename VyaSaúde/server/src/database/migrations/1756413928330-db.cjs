/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1756413928330 {
    name = 'Db1756413928330'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`paciente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cpf\` varchar(11) NOT NULL, \`sus\` char(15) NOT NULL, \`nome\` varchar(70) NOT NULL, \`nome_social\` varchar(70) NULL, \`data_nascimento\` date NOT NULL, \`num_telefone\` varchar(15) NOT NULL, \`email\` varchar(100) NOT NULL, \`etnia\` char(15) NOT NULL, \`genero\` char(15) NOT NULL, \`escolaridade\` varchar(20) NOT NULL, \`nacionalidade\` char(15) NOT NULL, \`naturalidade_estado\` char(20) NOT NULL, \`naturalidade_municipio\` char(25) NOT NULL, \`estado_clinico\` varchar(10) NOT NULL, \`responsavel_legal\` varchar(5) NOT NULL, \`filiacao_mae\` char(100) NOT NULL, \`filiacao_pai\` char(100) NOT NULL, \`enderecoId\` int NOT NULL, \`profissionalId\` int NOT NULL, \`cboCodigo\` varchar(4) NULL, UNIQUE INDEX \`IDX_8eb9dba1cf8f89575da9a5cb6d\` (\`cpf\`), UNIQUE INDEX \`IDX_ec68662b30f6a2c0c85005893c\` (\`sus\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_94d801f15c37933d6283561083e\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_0bc9a98435901937d1b9d207690\` FOREIGN KEY (\`profissionalId\`) REFERENCES \`profissional\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paciente\` ADD CONSTRAINT \`FK_361f85f5d3c37799d76f1c178f6\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_361f85f5d3c37799d76f1c178f6\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_0bc9a98435901937d1b9d207690\``);
        await queryRunner.query(`ALTER TABLE \`paciente\` DROP FOREIGN KEY \`FK_94d801f15c37933d6283561083e\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec68662b30f6a2c0c85005893c\` ON \`paciente\``);
        await queryRunner.query(`DROP INDEX \`IDX_8eb9dba1cf8f89575da9a5cb6d\` ON \`paciente\``);
        await queryRunner.query(`DROP TABLE \`paciente\``);
    }
}
