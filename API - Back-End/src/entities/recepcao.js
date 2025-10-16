import { EntitySchema } from "typeorm";

const recepcao = new EntitySchema({
    name: "Recepcao",
    tableName: "recepcao",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome_recepcionista: {type: "varchar", length: 100, nullable: false},
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

export default recepcao;