import { EntitySchema } from "typeorm";

const paciente = new EntitySchema({
    name: "Paciente",
    tableName: "paciente",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome: {type: "varchar", length: 70, nullable: false},
        nome_social: {type: "varchar", length: 70, nullable: true},
        cpf: {type: "varchar", length: 11, nullable: false, unique: true},
        sus: {type: "char", length: 15, nullable: false, unique: true},
        data_nascimento: {type: "date", nullable: false},
        genero: {type: "char", length: 15, nullable: false},
        etnia: {type: "char", length: 15, nullable: false},
        estado_civil: {type: "char", length: 50, nullable: false},
        nacionalidade: {type: "char", length: 15, nullable: false},
        naturalidade_estado: {type: "char", length: 2, nullable: false},
        naturalidade_municipio: {type: "char", length: 25, nullable: false},
        filiacao_mae: {type: "char", length: 100, nullable: false, default: "Desconhecido"},
        filiacao_pai: {type: "char", length: 100, nullable: false, default: "Desconhecido"},
        num_telefone: {type: "varchar", length: 12, nullable: false},
        email: {type: "varchar", length: 100, nullable: false},
        escolaridade: {type: "varchar", length: 30, nullable: false},
        nome_instituicao: {type: "varchar", length: 50, nullable: false},
        tipo_instituicao: {type: "varchar", length: 50, nullable: false},
        estado_clinico: {type: "varchar", length: 50, nullable: false},
        leitura: {type: "boolean", default: true, nullable: false},
        escrita: {type: "boolean", default: true, nullable: false},
        responsavel_legal: {type: "varchar", length: 70, nullable: false},
        inatividade: {type: "datetime", nullable: true}
      },
    relations: {
        endereco: {type: "many-to-one", target: "Endereco", nullable: false},
        agente: {type: "many-to-one", target: "Agente", nullable: true},
        cbo: {type: "many-to-one", target: "Cbo", nullable: true}
    }
});

export default paciente;