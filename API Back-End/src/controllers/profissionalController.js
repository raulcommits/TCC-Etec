import express, { request, response } from "express";
import profissional from "../entities/profissional.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioProfissional = AppDataSource.getRepository(profissional);

route.get("/", async (request, response) => {
    const profissionais = await repositorioProfissional.find({});
    return response.status(200).send({"response": profissionais});
});

route.get("/encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarProfissional = await repositorioProfissional.findBy({name: Like(`%${encontrarNome}`)});
    return response.status(200).send({"response": encontrarProfissional})
});

route.post("/", async (request, response) => {
    const {nome, cpf, cbm, data_admissao, email, telefone, posto, cbo} = request.body;

    if(nome.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({"response": "O cpf deve conter 11 caracteres."});
    }
    if(cbm.length != 20) {
        return response.status(400).send({"response": "o cbm deve conter 15 caracteres."});
    }
    if(data_admissao != 8 && !data_admissao.isDate()) {
        return response.status(400).send({"response": ""})
    }
});

export default route;