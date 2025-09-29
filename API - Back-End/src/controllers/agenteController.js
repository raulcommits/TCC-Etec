import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";
import { authenticate } from "../utils/jwt.js";
import express from "express";
import agente from "../entities/agente.js";
import usuario from "../entities/usuario.js";
import posto from "../entities/postosaude.js/index.js";
import cbo from "../entities/cbo.js";

const route = express.Router();
const repositorioAgente = AppDataSource.getRepository(agente);
const repositorioUsuario = AppDataSource.getRepository(usuario);
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioCbo = AppDataSource.getRepository(cbo);

route.get("/me", authenticate, async (request, response) => {
   const dadosAgente = await repositorioAgente.findOne({
      where: {email: request.usuario.email},
      relations: ["posto", "cbo"]
   });

   if (!dadosAgente) {
      return response.status(404).send({response: "Usuário não encontrado."});
   }

   const usuario = await repositorioUsuario.findOneBy({email: request.usuario.email});
   if (!usuario) {
      return response.status(404).send({response: "Usuário não encontrado."});
   }

   const agente = {...dadosAgente, createdAt: usuario.createdAt}

   return response.status(200).send({response: agente});
});

route.get("/", async (request, response) => {
    const agentes = await repositorioAgente.findBy({data_demissao: IsNull()});
    return response.status(200).send({response: agentes});
});

route.get("/:encontrarNome", async (request, response) => {
   const {encontrarNome} = request.params;
   const encontrarAgente = await repositorioAgente.find({where: [
      {nome: Like(`%${encontrarNome}`)},
      {cpf: encontrarNome}
   ]});
   return response.status(200).send({"response": encontrarAgente});
});

route.post("/", async (request, response) => {
    const {nome, cpf, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome.length < 1) {
        return response.status(400).send({response: "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if(data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O telefone deve conter 11 caracteres no máximo."});
    }
    
    try {
        const posto = await repositorioPosto.findOneBy({
            id: id_posto
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        const novo_agente = repositorioAgente.create({nome, cpf, data_admissao, email, telefone, posto, cbo});
        await repositorioAgente.save(novo_agente);
        return response.status(201).send({response: "Agente cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({response: err});
    }
});

route.put("/:id", async (request, response) => {

    const {id} = request.params;
    const {nome, cpf, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome.length < 1) {
        return response.status(400).send({response: "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if(data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if(telefone.length != 11) {
        return response.status(400).send({response: "O telefone deve conter 11 caracteres."});
    }

    try {
        const posto = await repositorioPosto.findOneBy({
            id: id_posto
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        await repositorioAgente.update({id}, {nome, cpf, data_admissao, email, telefone, posto, cbo});
        return response.status(200).send({response: "Agente atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err})
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    try {
        await repositorioAgente.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({response: "Agente deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;