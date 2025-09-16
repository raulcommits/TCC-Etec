import express, { request, response } from "express";
import profissional from "../entities/profissional.js";
import posto from "../entities/postosaude.js";
import cbo from "../entities/cbo.js";
import { AppDataSource } from "../database/data-source.js";
import { IsNull, Like } from "typeorm";

const route = express.Router();
const repositorioProfissional = AppDataSource.getRepository(profissional);
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioCbo = AppDataSource.getRepository(cbo);

route.get("/", async (request, response) => {
    const profissionais = await repositorioProfissional.findBy({deletedAt: IsNull()});
    return response.status(200).send({"response": profissionais});
});

route.get("/encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarProfissional = await repositorioProfissional.findBy({nome: Like(`%${encontrarNome}`)});
    return response.status(200).send({"response": encontrarProfissional});
});

route.post("/", async (request, response) => {
    const {nome, cpf, crm, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({"response": "O cpf deve conter 11 caracteres."});
    }
    if(crm.length != 20) {
        return response.status(400).send({"response": "o crm deve conter 20 caracteres."});
    }
    if(data_admissao.length != 8) {
        return response.status(400).send({"response": "A data deve estar no formato de data"});
    }
    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'"});
    }
    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({"response": "O telefone deve conter 11 caracteres no máximo."});
    }
    try {
        const posto = await repositorioPosto.findOneBy({
            id: id_posto
        });
        if(!posto) {
            return response.status(400).send({"response": "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        });
        if(!cbo) {
            return response.status(400).send({"response": "O cbo não foi encontrado."});
        }

        const novo_profissional = repositorioProfissional.create({nome, cpf, crm, data_admissao, email, telefone, posto, cbo});
        await repositorioProfissional.save(novo_profissional);
        return response.status(201).send({"response": "Profissional cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({"response": err});
    }
});

route.put("/:id", async (request, response) => {

    const {id} = request.params;
    const {nome, cpf, crm, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({"response": "O cpf deve conter 11 caracteres."});
    }
    if(crm.length != 20) {
        return response.status(400).send({"response": "o crm deve conter 15 caracteres."});
    }
    if(data_admissao.length != 8) {
        return response.status(400).send({"response": "A data deve estar no formato de data"});
    }
    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'"});
    }
    if(telefone.length != 11) {
        return response.status(400).send({"response": "O telefone deve conter 11 caracteres."});
    }

    try {
        const posto = await repositorioPosto.findOneBy({
            id: id_posto
        });
        if(!posto) {
            return response.status(400).send({"response": "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        });
        if(!cbo) {
            return response.status(400).send({"response": "O cbo não foi encontrado."});
        }

        await repositorioProfissional.update({id}, {nome, cpf, crm, data_admissao, email, telefone, posto, cbo});
        return response.status(200).send({"response": "Profissional atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err})
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({"response": "O id deve ser numérico."});
    }

    try {
        await repositorioProfissional.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({"response": "Profissional deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }
});

export default route;