import { EntitySchema } from "typeorm";

const usuario = new EntitySchema({
    name: "Usuario",
    tableName: "usuario",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        cpf: {type: "varchar", length: 11, nullable: false, unique: true},
        nome: {type: "varchar", length: 50, nullable: false},
        senha: {type: "varchar", length: 14, nullable: false},
        email: {type: "varchar", length: 40, nullable: false},
        tipoUsuario: {type: "enum", enum: ["admin", "profissional", "paciente"], nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default usuario;