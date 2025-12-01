import { EntitySchema } from "typeorm";

const usuario = new EntitySchema({
    name: "Usuario",
    tableName: "usuario",
    columns: {
        cpf: {primary: true, type: "char", length: 11},
        nome: {type: "varchar", length: 50, nullable: false},
        senha: {type: "varchar", length: 14, nullable: false},
        email: {type: "varchar", length: 80, nullable: false},
        tipoUsuario: {type: "enum", enum: ["admin", "agente", "recepcao", "gerente", "paciente"], nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default usuario;