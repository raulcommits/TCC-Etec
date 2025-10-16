import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import posto from "../entities/postosaude.js";
import endereco from "../entities/endereco.js";
import gerente from "../entities/gerenteposto.js";

const route = express.Router();
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioEndereco = AppDataSource.getRepository(endereco);
const repositorioGerente = AppDataSource.getRepository(gerente);

route.get("/", async (request, response) => {
    const postos = await repositorioPosto.find();
    return response.status(200).send({response: postos});
})

route.get("/:encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarPosto = await repositorioPosto.findBy({nome_posto: Like(`%${encontrarNome}`)});
    return response.status(200).send({response: encontrarPosto});
});

route.post("/", async (request, response) => {
    const {nome_posto, telefone, email, horario_funcionamento, tipo_atendimento, capacidade, servicos_disponiveis, id_endereco, id_gerente} = request.body;

    if(nome_posto.length < 1) {
        return response.status(400).send({response: "O nome do posto deve conter no mínimo 1 caractere."});
    }

    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
    }

    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'."});
    }
    
    if(horario_funcionamento.length < 10) {
        return response.status(400).send({response: "O horário deve conter ao menos 10 caracteres, sendo 5 para início do horário e 5 para o fim do horário."});
    }
    
    if(tipo_atendimento.toUpperCase() != "UBS" && tipo_atendimento.toUpperCase() != "UPA" && tipo_atendimento.toUpperCase() != "AMA") {
    return response.status(400).send({response: "O atendimento deve ser um dos três tipos: 'UBS'; 'UPA'; 'AMA'."});
    }
    
    if(capacidade.length < 1) {
        return response.status(400).send({response: "A capacidade deve conter ao menos 1 caractere."});
    }
    
    try {
        const endereco = await repositorioEndereco.findOneBy({
            id: id_endereco
        });
        if(!endereco) {
            return response.status(400).send({response: "Esse endereço não foi encontrado."});
        }

        const gerente = await repositorioGerente.findOneBy({
            id: id_gerente
        });
        if(!gerente) {
            return response.status(400).send({response: "Esse responsável não foi encontrado."});
        }

        const novo_posto = repositorioPosto.create({nome_posto, telefone, email, horario_funcionamento, tipo_atendimento, capacidade, servicos_disponiveis, endereco, gerente});
        await repositorioPosto.save(novo_posto);
        return response.status(201).send({response: "Posto cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({response: err});
    }
});

route.put("/:id", async (request, response) => {
    const {id} = request.params;
    const {nome_posto, telefone, email, horario_funcionamento, tipo_atendimento, capacidade, servicos_disponiveis, id_endereco, id_gerente} = request.body;

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    if(nome_posto.length < 1) {
        return response.status(400).send({response: "O nome do posto deve conter no mínimo 1 caractere."});
    }

    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
    }

    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'."});
    }
    
    if(horario_funcionamento.length < 10) {
        return response.status(400).send({response: "O horário deve conter ao menos 10 caracteres, sendo 5 para início do horário e 5 para o fim do horário."});
    }
    
    if(tipo_atendimento.toUpperCase() != "UBS" && tipo_atendimento.toUpperCase() != "UPA" && tipo_atendimento.toUpperCase() != "AMA") {
    return response.status(400).send({response: "O atendimento deve ser um dos três tipos: 'UBS'; 'UPA'; 'AMA'."});
    }
    
    if(capacidade.length < 1) {
        return response.status(400).send({response: "A capacidade deve conter ao menos 1 caractere."});
    }

    try {
        const endereco = await repositorioEndereco.findOneBy({
            id: id_endereco
        });
        if(!endereco) {
            return response.status(400).send({response: "Esse endereço não foi encontrado."});
        }

        const gerente = await repositorioGerente.findOneBy({
            id: id_gerente
        });
        if(!gerente) {
            return response.status(400).send({response: "Esse responsável não foi encontrado."});
        }
        await repositorioPosto.update({id}, {nome_posto, telefone, email, horario_funcionamento, tipo_atendimento, capacidade, servicos_disponiveis, endereco, gerente});
        return response.status(200).send({response: "Posto atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }

});

export default route;