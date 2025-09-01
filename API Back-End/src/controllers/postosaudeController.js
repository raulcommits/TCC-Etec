import express, { request, response } from "express";
import postosaude from "../entities/postosaude.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioPostosaude = AppDataSource.getRepository(postosaude);

route.get("/", async (request, response) => {
    const postosaude = await repositorioPostosaude.find({});
    return response.status(200).send({"response": postosaude});
});

route.get("/encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarPostosaude = await repositorioPostosaude.findBy({name: Like(`%${encontrarNome}`)});
    return response.status(200).send({"response": encontrarPostosaude})
});

route.post("/", async (request, response) => {
    const {nome_posto, horario_funcionamento, capacidade, email, telefone, tipo_atendimento, servicos_disponiveis} = request.body;

    if(nome_posto.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
    if(telefone.length < 10) {
        return response.status(400).send({"response": "O numero deve conter pelo menos 10 caraceteres."});
    }
    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'."});
    }
    if(servicos_disponiveis.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
    if(capacidade.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
  
    if(horario_funcionamento.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
      if(tipo_atendimento.toLowerCase() != "UBS" && tipo_atendimento.toLowerCase() != "UPA" && tipo_atendimento.toLowerCase() != "AMA") {
        return response.status(400).send({"response": "O usuário deve ser um dos três tipos: 'OBS'; 'UPA'; 'AMA'."});
      }

    try {       
        const novoPostosaude = repositorioPostosaude.create({nome_posto, horario_funcionamento, capacidade, email, telefone, tipo_atendimento, servicos_disponiveis});
        await repositorioPostosaude.save(novoPostosaude);
        return response.status(201).send({"response": "Posto de saúde cadastrado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }

});


route.put("/:id", async (request, response) => {
    const {id} = request.params;
    const {nome_posto, horario_funcionamento, capacidade, email, telefone, tipo_atendimento, servicos_disponiveis} = request.body;

     if(nome_posto.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
    if(telefone.length < 10) {
        return response.status(400).send({"response": "O numero deve conter pelo menos 10 caraceteres."});
    }
    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'."});
    }
    if(servicos_disponiveis.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
    if(capacidade.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
  
    if(horario_funcionamento.length < 1) {
        return response.status(400).send({"response": "O nome deve conter no mínimo 1 caractere."});
    }
      if(tipo_atendimento.toLowerCase() != "UBS" && tipo_atendimento.toLowerCase() != "UPA" && tipo_atendimento.toLowerCase() != "AMA") {
        return response.status(400).send({"response": "O usuário deve ser um dos três tipos: 'OBS'; 'UPA'; 'AMA'."});
      }

    try {
        const novoPostosaude = repositorioPostosaude.create({nome_posto, horario_funcionamento, capacidade, email, telefone, tipo_atendimento, servicos_disponiveis});
        await repositorioPostosaude.save(novoPostosaude);
        return response.status(201).send({"response": "Posto de saúde atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }

        
    
});



route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }

    try {
        await repositorioPostosaude.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({"response": "Posto deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }
});






export default route;