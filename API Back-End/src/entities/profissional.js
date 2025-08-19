import { EntitySchema } from "typeorm";

const profissional = new EntitySchema({
    name: "Profissional",
    tableName: "profissional",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome: {type: "varchar", length: 100, nullable: false},
        cpf: {type: "int", unique: true, nullable: false},
        cbo: {type: "varchar", length: 6, nullable: false},
        crm: {type: "varchar", length: 20, nullable: false},
        data_admissao: {type: "date", nullable: false},
        data_demissao: {type: "date", nullable: true},
        email: {type: "varchar", length: 100, nullable: false},
        telefone: {type: "varchar", length: 11, nullable: false}
    },
    relations: {
        posto: {type: "many-to-one", target: "Posto", nullable: false}
    }
});

export default profissional;