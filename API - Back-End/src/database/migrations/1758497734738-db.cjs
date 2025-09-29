/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1758497734738 {
    name = 'Db1758497734738'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`posto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_posto\` varchar(100) NOT NULL, \`telefone\` varchar(15) NOT NULL, \`email\` varchar(100) NOT NULL, \`horario_funcionamento\` varchar(100) NOT NULL, \`tipo_atendimento\` enum ('UBS', 'UPA', 'AMA') NOT NULL, \`capacidade\` int NOT NULL, \`servicos_disponiveis\` text NULL, \`enderecoId\` int NOT NULL, \`gerenteId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`tipoUsuario\` \`tipoUsuario\` enum ('admin', 'agente', 'recepcao', 'gerente', 'paciente') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`material_predominante\` CHANGE \`nome_material\` \`nome_material\` enum ('Alvenaria', 'Madeira', 'Misto', 'Pré-fabricado') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_5486b07bf03740743e091e6c745\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`estado\` \`estado\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`tipoAnimalId\` \`tipoAnimalId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_c473e2704f7fa1e2e2664204474\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posto\` ADD CONSTRAINT \`FK_a8ab8d4019d0f08fdb8d6b1f0bc\` FOREIGN KEY (\`gerenteId\`) REFERENCES \`gerente_posto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_5486b07bf03740743e091e6c745\` FOREIGN KEY (\`tipoAnimalId\`) REFERENCES \`tipo_animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_5486b07bf03740743e091e6c745\``);
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_a8ab8d4019d0f08fdb8d6b1f0bc\``);
        await queryRunner.query(`ALTER TABLE \`posto\` DROP FOREIGN KEY \`FK_c473e2704f7fa1e2e2664204474\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`tipoAnimalId\` \`tipoAnimalId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`estado\` \`estado\` enum ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'PN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_5486b07bf03740743e091e6c745\` FOREIGN KEY (\`tipoAnimalId\`) REFERENCES \`tipo_animal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`material_predominante\` CHANGE \`nome_material\` \`nome_material\` enum ('Alvenaria', 'Madeira', 'Misto', 'Pre_fabricado') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`tipoUsuario\` \`tipoUsuario\` enum ('admin', 'Agente', 'paciente', 'recepcao') NOT NULL`);
        await queryRunner.query(`DROP TABLE \`posto\``);
    }
}
