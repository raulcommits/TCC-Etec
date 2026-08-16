import { EntitySchema } from "typeorm";

const zona = new EntitySchema({
    name: "Zona",
    tableName: "zona",
    columns: {
        id: {primary: true, type: "int", generated: true},
        nome_zona: {type: "enum", enum: ["Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste", "Zona Central"], nullable: false},
        descricao: {type: "enum", enum: ["Região Norte de Embu das Artes", "Região Sul de Embu das Artes", "Região Leste de Embu das Artes", "Região Oeste de Embu das Artes", "Região Central de Embu das Artes"], nullable: false}
    }
});

export default zona;