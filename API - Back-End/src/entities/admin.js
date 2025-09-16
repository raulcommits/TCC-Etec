import { EntitySchema } from "typeorm";

const administrador = new EntitySchema({
    name: "Admin",
    tableName: "admin",
    columns: {
        id: {primary: true, type: int, generated: true},
        nome: {type: "varchar", length: 100, nullable: false},
        cpf: {type: "varchar", length: 11, nullable: false, unique: true},
        email: {type: "varchar", length: 100, nullable: false},
        telefone: {type: "varchar", length: 11, nullable: false},
        data_demissao: {type: "date", nullable: true}
    },
    relations: {
        posto: {type: "many-to-one", target: "Posto", nullable: false},
        cbo: {type: "one-to-one", target: "Cbo", nullable: false}
    }
});

export default administrador;