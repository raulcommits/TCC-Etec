import { EntitySchema } from "typeorm";

const medico = new EntitySchema({
    name: "Medico",
    tableName: "medico",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome_medico: {type: "varchar", length: 100, nullable: false},
        crm: {type: "varchar", length: 6, nullable: false, unique: true},
        cpf: {type: "varchar", length: 11, unique: true, nullable: false},
        data_admissao: {type: "date", nullable: false},
        data_demissao: {type: "date", nullable: true},
        email: {type: "varchar", length: 100, nullable: false},
        telefone: {type: "varchar", length: 11, nullable: false}
    },
    relations: {
        posto: {type: "many-to-one", target: "Posto", nullable: false},
        cbo: {type: "many-to-one", target: "Cbo", nullable: false}
    }
});

export default medico;