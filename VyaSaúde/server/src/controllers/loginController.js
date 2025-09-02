import usuario from "../entities/usuario.js";
import express, { request, response } from "express";
import { AppDataSource } from "../database/data-source.js";
import { IsNull } from "typeorm";

const route = express.Router();
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.post("/", async (request, response) => {
    const {cpf, senha} = request.body;

    if(cpf.length != 11) {
        return response.status(400).send({"response": "O CPF deve conter 11 dígitos."});
    }

    if(senha.length < 8) {
        return response.status(400).send({"response": "A senha deve conter ao menos 8 caracteres."});
    }

    const usuario = await repositorioUsuario.findOneBy({
        cpf, senha
    });

    if(!usuario) {
        return response.status(401).send({"response": "Usuário ou senha inválido."});
    }

    return response.status(200).send({"response": "Login efetuado com sucesso."});
});

route.put("/nova-senha", async (request, response) => {
    const {email} = request.body;

    const usuario = await repositorioUsuario.findOneBy({
        email, deletedAt: IsNull()
    });

    if(!usuario) {
        return response.status(400).send({"response": "Email inválido."});
    }

    await repositorioUsuario.update({email}, {senha});
});

export default route;