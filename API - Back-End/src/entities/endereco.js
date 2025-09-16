import {EntitySchema} from "typeorm";

const endereco = new EntitySchema({
    name: "Endereco",
    tableName: "endereco",
    columns: {
        id: {primary: true, type: "int", generated: true},
        logradouro: {type: "varchar", length: 100, nullable: false},
        numero: {type: "varchar", length: 100, nullable: false},
        complemento: {type: "varchar", length: 50, nullable: false},
        cep: {type: "varchar", length: 10, nullable: false},
        pais: {type: "varchar", length: 50, nullable: false, default: "Brasil"},
        estado: {type: "enum", enum: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
        "PA", "PB", "PR", "PE", "PI", "RJ", "PN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"], nullable: false},
        cidade: {type: "varchar", length: 50, nullable: false},
        bairro: {type: "varchar", length: 50, nullable: false},
        ponto_referencia: {type: "varchar", length: 100, nullable: true},
        tipo_animal: {type: "enum", enum: ["Cachorro", "Gato", "Pássaro", "Outros"], nullable: true},
        tipo_animal: {type: "enum", enum: ["Casa", "Apartamento", "Comercial", "Terreno"], nullable: false},
        material_predominante: {type: "enum", enum: ["Alvenaria", "Madeira", "Misto", "Pre_fabricado"], nullable: false}
    },
    relations: {
        zona: {type: "many-to-one", target: "Zona", nullable: false}
    }
});

export default endereco;