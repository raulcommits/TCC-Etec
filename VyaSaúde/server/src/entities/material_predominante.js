import { EntitySchema } from "typeorm";

const material_predominante = new EntitySchema({
    name: "MaterialPredominante",
    tableName: "material_predominante",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome_material: {type: "enum", enum: ["Alvenaria", "Madeira", "Misto", "Pré-fabricado"], nullable: false}
    }
});

export default material_predominante;