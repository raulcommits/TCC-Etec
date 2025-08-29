import {EntitySchema} from "typeorm";

const tipo_animal = new EntitySchema({
    name: "TipoAnimal",
    tableName: "tipo_animal",
    columns: {
        id: {primary: true, type: "int"},
        nome_animal: {type: "enum", enum: ["Cachorro", "Gato", "Pássaro", "Outros"], nullable: true}
    }
});

export default tipo_animal;