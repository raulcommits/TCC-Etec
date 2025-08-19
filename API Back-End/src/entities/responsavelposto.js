import { EntitySchema } from "typeorm";

const responsavelPosto = new EntitySchema({
    name: "ResponsavelPosto",
    tableName: "responsavel_posto",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome: {type: "varchar", length: 100, nullable: false},
        telefone: {type: "varchar", length: 15, nullable: false},
        cargo: {type: "varchar", length: 50, nullable: false}
    }
});

export default responsavelPosto;