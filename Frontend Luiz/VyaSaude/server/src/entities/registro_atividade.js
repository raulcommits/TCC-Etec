import {EntitySchema} from "typeorm";

const registro_atividade = new EntitySchema({
    name: "RegistroAtividade",
    tableName: "registro_atividade",
    columns: {
        id: {primary: true, type: "int", generated: true},
        data_visita: {type: "datetime", nullable: false},
        registro_visita: {type: "text", nullable: false},
        motivo: {type: "enum", enum: ["Cadastramento/Atualização", "Visita Periódica"], nullable: false},
        desfecho: {type: "enum", enum: ["Visita realizada", "Visita recusada", "Ausente"], nullable: false},
        descricao: {type: "text", nullable: true}
    },
    relations: {
        agente: {type: "many-to-one", target: "Agente", nullable: false},
        paciente: {type: "many-to-one", target: "Paciente", nullable: false},
        endereco: {type: "many-to-one", target: "Endereco", nullable: false}
    }
});

export default registro_atividade;