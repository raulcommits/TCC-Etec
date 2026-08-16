import { EntitySchema } from "typeorm";

const gerentePosto = new EntitySchema({
    name: "GerentePosto",
    tableName: "gerente_posto",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome: {type: "varchar", length: 100, nullable: false},
        telefone: {type: "varchar", length: 15, nullable: false},
        cargo: {type: "varchar", length: 50, nullable: false}
    }
});

export default gerentePosto;