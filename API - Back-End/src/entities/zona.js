import { EntitySchema } from "typeorm";

const zona = new EntitySchema({
    name: "Zona",
    tableName: "zona",
    columns: {
        id: {primary: true, type: "int", generated: true},
        bairro: {type: "varchar", length: 35, nullable: false},
        unidade_administrativa: {type: "varchar", length: 35, nullable: false},
        regiao: {type: "varchar", length: 10, nullable: false}
    }
});

export default zona;