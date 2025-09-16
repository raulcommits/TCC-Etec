import { EntitySchema } from "typeorm";

const medico = new EntitySchema({
    name: "Medico",
    tableName: "medico",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome_medico: {type: "varchar", length: 100, nullable: false},
        cpf: {type: "varchar", length: 11, unique: true, nullable: false},
        email_institucional: {type: "varchar", length: 100, nullable: false},
        telefone: {type: "varchar", length: 11, nullable: false},
        crm: {type: "varchar", length: 6, nullable: false, unique: true},
        data_admissao: {type: "date", nullable: false},
        data_demissao: {type: "date", nullable: true}
    },
    relations: {
        posto: {type: "many-to-one", target: "Posto", nullable: false},
        cbo: {type: "many-to-one", target: "Cbo", nullable: false}
    }
});

export default medico;