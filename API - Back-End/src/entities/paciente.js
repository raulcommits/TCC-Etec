import { EntitySchema } from "typeorm";

const paciente = new EntitySchema({
    name: "Paciente",
    tableName: "paciente",
    columns: {
        id: {primary: true, type: "int", generated: true},
        cpf: {type: "varchar", length: 11, nullable: false, unique: true},
        sus: {type: "char", length: 15, nullable: false, unique: true},
        nome: {type: "varchar", length: 70, nullable: false},
        nome_social: {type: "varchar", length: 70, nullable: true},
        data_nascimento: {type: "date", nullable: false},
        num_telefone: {type: "varchar", length: 15, nullable: false},
        email: {type: "varchar", length: 100, nullable: false},
        etnia: {type: "enum", enum: ["branco", "preto", "pardo", "indigena", "asiatico", "outro"], nullable: false},
        genero: {type: "enum", enum: ["masculino", "feminino", "não-binário", "transsexual", "outro"], nullable: false},
        escolaridade: {type: "enum", enum: ["Ensino Fundamental 1 a 4 series", "Ensino Fundamental Completo", "Ensino Médio Incompleto", "Ensino Médio Completo", "Ensino Médio EJA", "Superior, Aperfeicoamento, Especialização, Mestrado, Doutorado"], nullable: false},
        nacionalidade: {type: "char", length: 15, nullable: false, default: "Brasileiro"},
        naturalidade_estado: {type: "char", length: 20, nullable: false},
        naturalidade_municipio: {type: "char", length: 25, nullable: false},
        estado_clinico: {type: "varchar", length: 10, nullable: false},
        responsavel_legal: {type: "varchar", length: 5, nullable: false},
        filiacao_mae: {type: "char", length: 100, nullable: false},
        filiacao_pai: {type: "char", length: 100, nullable: false}
    },
    relations: {
        endereco: {type: "many-to-one", target: "Endereco", nullable: false},
        agente: {type: "many-to-one", target: "Profissional", nullable: false},
        cbo: {type: "many-to-one", target: "Cbo", nullable: true}
    }
});

export default paciente;