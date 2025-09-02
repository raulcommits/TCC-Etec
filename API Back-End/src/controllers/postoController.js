import express, {request, response} from "express";
import posto from "../entities/postosaude.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioPosto = AppDataSource.getRepository(posto);

route.get("/", async (request, response) => {
    const postos = await repositorioPosto.find();
    return response.status(200).send({"response": postos});
})

route.get("/:encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarPosto = await repositorioPosto.findBy({nome_posto: Like(`%${encontrarNome}`)});
    return response.status(200).send({"response": encontrarPosto});
});

route.post("/", async (request, response) => {
    const {nome_posto, telefone, email, horario_funcionamento, tipo_atendimento, capacidade, servicos_disponiveis, id_endereco, id_responsavel} = request.body;

    if(nome_posto.length < 1) {
        return response.status(400).send({"response": "O nome do posto deve conter no mínimo 1 caractere."});
    }

    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({"response": "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
    }

    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'."});
    }
    
    if(horario_funcionamento.length < 10) {
        return response.status(400).send({"response": "O horário deve conter ao menos 10 caracteres, sendo 5 para início do horário e 5 para o fim do horário."});
    }
    
    if(tipo_atendimento.toUpperCase() != "UBS" && tipo_atendimento.toUpperCase() != "UPA" && tipo_atendimento.toUpperCase() != "AMA") {
    return response.status(400).send({"response": "O atendimento deve ser um dos três tipos: 'UBS'; 'UPA'; 'AMA'."});
    }
    
    if(capacidade.length < 1) {
        return response.status(400).send({"response": "A capacidade deve conter ao menos 1 caractere."});
    }

    if(!isNaN(servicos_disponiveis)) {
        return response.status(400).send({"response": "Os serviços devem conter ao menos 1 caractere."});
    }
    
    try {
        const endereco = await repositorioEndereco.findOneBy({
            id: id_endereco
        });
        if(!endereco) {
            return response.status(400).send({"response": "Esse endereço não foi encontrado."});
        }

        const responsavel = await repositorioResponsavel.findOneBy({
            id: id_responsavel
        });
        if(!responsavel) {
            return response.status(400).send({"response": "Esse responsável não foi encontrado."});
        }

        const novo_posto = repositorioPosto.create({nome_posto, telefone, email, horario_funcionamento, tipo_atendimento, capacidade, servicos_disponiveis, endereco, responsavel});
        await repositorioPosto.save(novo_posto);
        return response.status(201).send({"response": "Posto cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({"response": err});
    }
});



export default route;