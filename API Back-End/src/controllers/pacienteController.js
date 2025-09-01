import paciente from "../entities/paciente.js";
import express, { request, response } from "express";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioPaciente = AppDataSource.getRepository(paciente);
route.get("/", async (request, response) => {
    const paciente = await repositorioPaciente.find({});
    return response.status(200).send({"response": paciente});
});

route.get("/:encontrarPaciente", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarPaciente = await repositorioPaciente.findBy({name: Like(`%${encontrarNome}%`)});
    return response.status(200).send({"response": encontrarPaciente});
});

route.post("/", async (request, response) => {
    const { cpf, sus, nome,nome_social, data_nascimento, num_telefone,
         email, etnia, genero, escolaridade, nacionalidade, naturalidade_estado, naturalidade_municipio,
          estado_clinico,responsavel_legal,filiacao_mae,filiacao_pai} = request.body;

    
    
    if(cpf.length != 11) {
        return response.status(400).send({"response": "O CPF deve conter 11 dígitos."});
    }

    if(sus.length != 15) {
        return response.status(400).send({"response": "O Sus deve conter 15 caracteres."});
    }
       
    if(nome.length < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    
    if(nome_social.length < 1) {
        return response.status(400).send({"response": "O nome social deve conter pelo menos 1 caracetere."});
    }
    if(filiacao_mae < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    if(filiacao_pai.length < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    if(responsavel_legal.length < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    if(estado_clinico.length < 1) {
        return response.status(400).send({"response": "O estado cliico deve conter pelo menos 1 caracetere."});
    }
    if(naturalidade_estado.length < 1) {
        return response.status(400).send({"response": "A naturalidade do estado deve conter pelo menos 1 caracetere."});
    }
    if(naturalidade_municipio.length < 1) {
        return response.status(400).send({"response": "A naturalidade do municipio deve conter pelo menos 1 caracetere."});
    }
    if(nacionalidade.length < 1) {
        return response.status(400).send({"response": "A nacionalidade deve conter pelo menos 1 caracetere."});
    }
    if(escolaridade.length < 1) {
        return response.status(400).send({"response": "A escolaridade deve conter pelo menos 1 caracetere."});
    }
    if(genero.length < 1) {
        return response.status(400).send({"response": "O genero deve conter pelo menos 1 caracetere."});
    }
    if(etnia.length < 1) {
        return response.status(400).send({"response": "A etnia deve conter pelo menos 1 caracetere."});
    }
    if(num_telefone.length < 10) {
        return response.status(400).send({"response": "O numero deve conter pelo menos 10 caraceteres."});
    }
    if (isNaN(data_nascimento.getTime())) {
        return response.status(400).json({ error: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.' });
      }
    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'."});
    }

 try {
        const novoPaciente = repositorioPaciente.create({cpf, sus, nome,nome_social, data_nascimento, num_telefone,
         email, etnia, genero, escolaridade, nacionalidade, naturalidade_estado, naturalidade_municipio,
          estado_clinico,responsavel_legal,filiacao_mae,filiacao_pai});
        await repositorioPaciente.save(novoPaciente);
        return response.status(201).send({"response": "Paciente cadastrado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }
});    

 
route.put("/:id", async (request, response) => {
      const { cpf, sus, nome,nome_social, data_nascimento, num_telefone,
         email, etnia, genero, escolaridade, nacionalidade, naturalidade_estado, naturalidade_municipio,
          estado_clinico,responsavel_legal,filiacao_mae,filiacao_pai} = request.body;
           const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({"response": "O CPF deve conter 11 dígitos."});
    }

    if(sus.length != 15) {
        return response.status(400).send({"response": "O Sus deve conter 15 caracteres."});
    }
       
    if(nome.length < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    
    if(nome_social.length < 1) {
        return response.status(400).send({"response": "O nome social deve conter pelo menos 1 caracetere."});
    }
    if(filiacao_mae < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    if(filiacao_pai.length < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    if(responsavel_legal.length < 1) {
        return response.status(400).send({"response": "O nome deve conter pelo menos 1 caracetere."});
    }
    if(estado_clinico.length < 1) {
        return response.status(400).send({"response": "O estado cliico deve conter pelo menos 1 caracetere."});
    }
    if(naturalidade_estado.length < 1) {
        return response.status(400).send({"response": "A naturalidade do estado deve conter pelo menos 1 caracetere."});
    }
    if(naturalidade_municipio.length < 1) {
        return response.status(400).send({"response": "A naturalidade do municipio deve conter pelo menos 1 caracetere."});
    }
    if(nacionalidade.length < 1) {
        return response.status(400).send({"response": "A nacionalidade deve conter pelo menos 1 caracetere."});
    }
    if(escolaridade.length < 1) {
        return response.status(400).send({"response": "A escolaridade deve conter pelo menos 1 caracetere."});
    }
    if(genero.length < 1) {
        return response.status(400).send({"response": "O genero deve conter pelo menos 1 caracetere."});
    }
    if(etnia.length < 1) {
        return response.status(400).send({"response": "A etnia deve conter pelo menos 1 caracetere."});
    }
    if(num_telefone.length < 10) {
        return response.status(400).send({"response": "O numero deve conter pelo menos 10 caraceteres."});
    }
    if (isNaN(data_nascimento.getTime())) {
        return response.status(400).json({ error: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.' });
      }
    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email deve conter '@'."});
    }


    try {
        await repositorioPaciente.update({id}, { cpf, sus, nome,nome_social, data_nascimento, num_telefone,
         email, etnia, genero, escolaridade, nacionalidade, naturalidade_estado, naturalidade_municipio,
          estado_clinico,responsavel_legal,filiacao_mae,filiacao_pai});
        return response.status(200).send({"response": "Paciente atualizado com sucesso."});
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
        await repositorioPaciente.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({"response": "Paciente deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({"response": err});
    }
});

export default route;
