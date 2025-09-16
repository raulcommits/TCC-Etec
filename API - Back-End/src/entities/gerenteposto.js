import { EntitySchema } from "typeorm";

const gerentePosto = new EntitySchema({
    name: "GerentePosto",
    tableName: "gerente_posto",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome: {type: "varchar", length: 100, nullable: false},
        telefone: {type: "varchar", length: 15, nullable: false},
        email: {type: "varchar", length: 80, nullable: false},
        cargo: {type: "varchar", length: 50, nullable: false},
        data_demissao: {type: "date", nullable: true}
    }
});

export default gerentePosto;