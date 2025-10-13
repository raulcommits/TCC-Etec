import {EntitySchema} from "typeorm";

const log_acesso = new EntitySchema({
    name: "LogAcesso",
    tableName: "log_acesso",
    columns: {
        id: {primary: true, type: "int", generated: true},
        login: {type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        atividade: {type: "text", nullable: false},
        logout: {type: "datetime", nullable: true}
    },
    relations: {
        usuario: {type: "many-to-one", target: "Usuario", nullable: false}
    }
});

export default log_acesso;