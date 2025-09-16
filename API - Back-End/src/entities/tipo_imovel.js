import { EntitySchema } from "typeorm";

const tipo_imovel = new EntitySchema({
    name: "TipoImovel",
    tableName: "tipo_imovel",
    columns: {
        id: {primary: true, type: "int"},
        nome_imovel: {type: "enum", enum: ["Casa", "Apartamento", "Comercial", "Terreno"], nullable: false}
    }
});

export default tipo_imovel;