import {EntitySchema} from "typeorm";

const endereco = new EntitySchema({
    name: "Endereco",
    tableName: "endereco",
    columns: {
        id: {primary: true, type: "int", generated: true},
        logradouro: {type: "varchar", length: 100, nullable: false},
        numero: {type: "varchar", length: 100, nullable: false},
        complemento: {type: "varchar", length: 50, nullable: false},
        bairro: {type: "varchar", length: 50, nullable: false},
        cidade: {type: "varchar", length: 50, nullable: false},
        estado: {type: "enum", enum: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
        "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"], nullable: false},
        cep: {type: "varchar", length: 10, nullable: false},
        pais: {type: "varchar", length: 50, nullable: false, default: "Brasil"},
        ponto_referencia: {type: "varchar", length: 100, nullable: true}
    },
    relations: {
        zona: {type: "many-to-one", target: "Zona", nullable: false},
        material_predominante: {type: "many-to-one", target: "MaterialPredominante", nullable: false},
        tipo_imovel: {type: "many-to-one", target: "TipoImovel", nullable: false},
        tipo_animal: {type: "many-to-one", target: "TipoAnimal", nullable: true}
    }
});

export default endereco;