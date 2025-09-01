import express, { request, response } from "express";
import usuario from "../entities/usuario.js";
import {AppDataSource} from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.get("/", async (request, response) => {
    const usuarios = await repositorioUsuario.find({});
    return response.status(200).send({"response": usuarios});
});

route.get("/:encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarUsuario = await repositorioUsuario.findBy({name: Like(`%${encontrarNome}%`)});
    return response.status(200).send({"response": encontrarUsuario});
});

route.post("/", async (request, response) => {
    const { } = request.body;

    if(cpf.length != 11) {
        return response.status(400).send({"response": "O CPF deve conter 11 dígitos."});
    }
    
    if(nome.length < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }

    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'."});
    }

    if(senha.length < 8) {
        return response.status(400).send({"response": "A senha deve conter pelo menos 8 caraceteres."});
    }

    if(tipoUsuario.toLowerCase() != "admin" && tipoUsuario.toLowerCase() != "paciente" && tipoUsuario.toLowerCase() != "profissional") {
        return response.status(400).send({"response": "O usuário deve ser um dos três tipos: 'Paciente'; 'Profissional'; 'Admin'."});
    }

    try {
        const novoUsuario = repositorioUsuario.create({cpf, nome, email, senha, tipoUsuario});
        await repositorioUsuario.save(novoUsuario);
        return response.status(201).send({"response": "Usuário cadastrado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }
});

route.put("/:cpf", async (request, response) => {
    const {cpf} = request.params;
    const {nome, email, senha, tipoUsuario} = request.body;

    if(nome.length < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'."});
    }
    if(senha.length < 8) {
        return response.status(400).send({"response": "A senha deve conter pelo menos 8 caraceteres."});
    }
    if(tipoUsuario.toLowerCase() != "admin" && tipoUsuario.toLowerCase() != "paciente" && tipoUsuario.toLowerCase() != "profissional") {
        return response.status(400).send({"response": "O usuário deve ser um dos três tipos: 'Paciente'; 'Profissional'; 'Admin'."});
    }

    try {
        await repositorioUsuario.update({cpf}, {nome, email, senha, tipoUsuario});
        return response.status(200).send({"response": "Usuário atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }
});

route.delete("/:cpf", async (request, response) => {
    const {cpf} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }

    try {
        await repositorioUsuario.update({cpf}, {deletedAt: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({"response": "Usuário deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }
});

export default route;