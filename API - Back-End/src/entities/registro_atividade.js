import {EntitySchema} from "typeorm";

const registro_atividade = new EntitySchema({
    name: "RegistroAtividade",
    tableName: "registro_atividade",
    columns: {
        id: {primary: true, type: "int", generated: true},
        data_visita: {type: "datetime", nullable: false},
        observacoes: {type: "text", nullable: true},
        acoes_realizadas: {type: "text", nullable: true}
    },
    relations: {
        agente: {type: "many-to-one", target: "Agente", nullable: false},
        paciente: {type: "many-to-one", target: "Paciente", nullable: false}
    }
});

export default registro_atividade;