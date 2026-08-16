import { EntitySchema } from "typeorm";

const cbo = new EntitySchema({
    name: "Cbo",
    tableName: "cbo",
    columns: {
        codigo: {primary: true, type: "varchar", length: 4, nullable: false},
        descricao: {type: "varchar", length: 255, nullable: false}
    }
});

export default cbo;