import { AppDataSource } from "../database/data-source.js";
import { IsNull, Like } from "typeorm";
import { authenticate } from "../utils/jwt.js";
import express from "express";
import recepcao from "../entities/agente.js";
import usuario from "../entities/usuario.js";
import posto from "../entities/postosaude.js";
import cbo from "../entities/cbo.js";

const route = express.Router();
const repositorioRecepcao = AppDataSource.getRepository(recepcao);
const repositorioUsuario = AppDataSource.getRepository(usuario);
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioCbo = AppDataSource.getRepository(cbo);

route.get("/", async (request, response) => {
    const recepcionistas = await repositorioRecepcao.findBy({data_demissao: IsNull()});
    return response.status(200).send({response: recepcionistas});
});

route.get("/:encontrarRecepcao", async (request, response) => {
   const {encontrarRecepcao} = request.params;
   const verificarRecepcao = await repositorioRecepcao.findOne({where: [
      {nome_recepcionista: Like(`%${encontrarRecepcao}`)},
      {cpf: encontrarRecepcao}
   ], 
      relations: ["posto", "cbo"]});
      
   if (!verificarRecepcao || verificarRecepcao.length === 0) {
      return response.status(404).send({ response: "Recepção não encontrada." });
   }
   
   return response.status(200).send(verificarRecepcao);
});

route.get("/perfil", authenticate, async (request, response) => {
   const {usuario} = request;

   if (!usuario) {
    return response.status(403).send({response: "Sem permissão de acesso."});
   }

   try {
    const recepcionista = await repositorioRecepcao.findOne({where:
        {cpf: usuario.cpf},
        relations: ["posto", "cbo"]
    });

    if (!recepcionista) {
        return response.status(404).send({response: "Recepcionista não encontrado."});
    }

    const recepcaoPayload = {
        ...recepcionista,
        posto: recepcionista.posto.nome_posto,
        cbo_codigo: recepcionista.cbo.codigo,
        cbo_descricao: recepcionista.cbo.descricao,
        data_admissao: usuario.data_admissao
    };

    return response.status(200).send(recepcaoPayload); 
   } catch(err) {
    console.log(err);
   }
});

route.post("/", async (request, response) => {
    const {nome_recepcionista, cpf, data_admissao, email, telefone, postoId, cboCodigo} = request.body;

    if (nome_recepcionista.length < 3) {
        return response.status(400).send({response: "O nome deve conter no mínimo 3 caracteres."});
    }
    if (cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if (data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if (!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if (telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
    }
    
    try {
        const posto = await repositorioPosto.findOneBy({
            id: postoId
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: cboCodigo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        const novo_recepcionista = repositorioRecepcao.create({nome_recepcionista, cpf, data_admissao, email, telefone, posto, cbo});
        await repositorioRecepcao.save(novo_recepcionista);
        return response.status(201).send({response: "Recepcionista cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({response: err});
    }
});

route.put("/:id", async (request, response) => {

    const {id} = request.params;
    const {nome_recepcionista, cpf, data_admissao, email, telefone, postoId, cboCodigo} = request.body;

    if (nome_recepcionista.length < 3) {
        return response.status(400).send({response: "O nome deve conter no mínimo 3 caracteres."});
    }
    if (cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if (data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if (!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if (telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
    }

    try {
        const posto = await repositorioPosto.findOneBy({
            id: postoId
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: cboCodigo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        await repositorioRecepcao.update({id}, {nome_recepcionista, cpf, data_admissao, email, telefone, posto, cbo});
        return response.status(200).send({response: "Agente atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err})
    }
});

route.put("atualizarRecepcao/:email", async (request, response) => {
   const {email} = request.params;
   const {telefone} = request.body;

   if (telefone.length < 10 && telefone.length > 11) {
      return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
   }

   try {
      await repositorioRecepcao.update({email}, {telefone});
      return response.status(200).send({response: "Email/telefone de recepcionista atualizado com sucesso."});
   } catch (err) {
      return response.status(500).send({response: err});
   }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    try {
        await repositorioRecepcao.update({id}, {data_demissao: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({response: "Recepcionista deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;