import { EntitySchema } from "typeorm";

const posto = new EntitySchema({
    name: "Posto",
    tableName: "posto",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome_posto: {type: "varchar", length: 100, nullable: false},
        telefone: {type: "varchar", length: 15, nullable: false},
        email: {type: "varchar", length: 100, nullable: false},
        horario_funcionamento: {type: "varchar", length: 100, nullable: false},
        tipo_atendimento: {type: "enum", enum: ["UBS", "UPA", "AMA"]},
        capacidade: {type: "int", nullable: false},
        servicos_disponiveis: {type: "text", nullable: true}
    },
    relations: {
        endereco: {type: "many-to-one", target: "Endereco", nullable: false},
        gerente: {type: "many-to-one", target: "GerentePosto", nullable: false}
    }
});

export default posto;