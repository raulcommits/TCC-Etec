/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1760314980694 {
    name = 'Db1760314980694'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`medico\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_medico\` varchar(100) NOT NULL, \`crm\` varchar(6) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`data_admissao\` date NOT NULL, \`data_demissao\` date NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`postoId\` int NOT NULL, \`cboCodigo\` varchar(4) NOT NULL, UNIQUE INDEX \`IDX_d5be975f1bf80b79b268a3e5dc\` (\`crm\`), UNIQUE INDEX \`IDX_d1541dc30c56eb55ade1530a33\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD CONSTRAINT \`FK_73054e9377a02e69631e32d5eb1\` FOREIGN KEY (\`postoId\`) REFERENCES \`posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medico\` ADD CONSTRAINT \`FK_74ec2a91d551c73333b907bde27\` FOREIGN KEY (\`cboCodigo\`) REFERENCES \`cbo\`(\`codigo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`medico\` DROP FOREIGN KEY \`FK_74ec2a91d551c73333b907bde27\``);
        await queryRunner.query(`ALTER TABLE \`medico\` DROP FOREIGN KEY \`FK_73054e9377a02e69631e32d5eb1\``);
        await queryRunner.query(`DROP INDEX \`IDX_d1541dc30c56eb55ade1530a33\` ON \`medico\``);
        await queryRunner.query(`DROP INDEX \`IDX_d5be975f1bf80b79b268a3e5dc\` ON \`medico\``);
        await queryRunner.query(`DROP TABLE \`medico\``);
    }
}
