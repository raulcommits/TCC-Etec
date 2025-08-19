import { EntitySchema } from "typeorm";

const zona = new EntitySchema({
    name: "Zona",
    tableName: "zona",
    columns: {
        id: {primary: true, type: "int", generated: true},
        descricao: {type: "enum", enum: ["Urbana", "Rural", "Indigena"], nullable: false}
    }
});

export default zona;