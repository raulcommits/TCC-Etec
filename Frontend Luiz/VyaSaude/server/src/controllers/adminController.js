import express from "express";
import administrador from "../entities/admin.js";
import posto from "../entities/postosaude.js";
import cbo from "../entities/cbo.js";
import { AppDataSource } from "../database/data-source.js";
import { IsNull, Like } from "typeorm";
import { authenticate } from "../utils/jwt.js";
/*  ------------------------------------------------    */
const route = express.Router();
const repositorioAdmin = AppDataSource.getRepository(administrador);
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioCbo = AppDataSource.getRepository(cbo);

route.get("/", async (request, response) => {
    const administradores = await repositorioAdmin.findBy({data_demissao: IsNull()});
    return response.status(200).send({"response": administradores});
});

route.get("/:encontrarNome", async (request, response) => {
   const {encontrarNome} = request.params;
   const encontrarAdmin = await repositorioAdmin.find({where: [
      {nome: Like(`%${encontrarNome}`)},
      {cpf: encontrarNome}
   ]});
   return response.status(200).send({"response": encontrarAdmin});
});

route.get("/perfil", authenticate, async (request, response) => {
   const {usuario} = request;

   if (!usuario) {
    return response.status(403).send({response: "Sem permissão de acesso."});
   }

   try {
    const administrador = await repositorioAdmin.findOne({where:
        {cpf: usuario.cpf},
        relations: ["posto", "cbo"]
    });

    if (!administrador) {
        return response.status(404).send({response: "Agente não encontrado."});
    }

    const adminPayload = {
        ...administrador,
        posto: administrador.posto.nome_posto,
        cbo_codigo: administrador.cbo.codigo,
        cbo_descricao: administrador.cbo.descricao,
        createdAt: usuario.createdAt
    };

    return response.status(200).send(adminPayload); 
   } catch(err) {
    console.log(err);
   }
});

// CADASTRO DE UM NOVO ADMINISTRADOR
route.post("/", async (request, response) => {
    const {nome_admin, cpf, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome_admin.length < 1) {
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
        return response.status(400).send({response: "O telefone deve conter até 11 caracteres."});
    }

    try {
      const posto = await repositorioPosto.findOneBy({
         id: id_posto
      });
      if(!posto) {
         return response.status(400).send({response: "O posto não foi encontrado."});
      }

      const cbo = await repositorioCbo.findOneBy({
         id: id_cbo
      });
      if(!cbo) {
         return response.status(400).send({response: "O cbo não foi encontrado."});
      }

      const novo_admin = repositorioAdmin.create({nome_admin, cpf, data_admissao, email, telefone, posto, cbo});
      await repositorioAdmin.save(novo_admin);
      return response.status(201).send({response: "Administrador cadastrado com sucesso."});
    } catch(err) {
      return response.status(500).send({response: err});
    }
});

route.put("/:id", async (request, response) => {
    const {nome_admin, cpf, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome_admin.length < 1) {
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
        return response.status(400).send({response: "O telefone deve conter até 11 caracteres."});
    }

    try {
      const posto = await repositorioPosto.findOneBy({
         id: id_posto
      });
      if(!posto) {
         return response.status(400).send({response: "O posto não foi encontrado."});
      }

      const cbo = await repositorioCbo.findOneBy({
         id: id_cbo
      });
      if(!cbo) {
         return response.status(400).send({response: "O cbo não foi encontrado."});
      }

      await repositorioAdmin.update({id}, {nome_admin, cpf, data_admissao, email, telefone, posto, cbo});
      return response.status(200).send({response: "Administrador atualizado com sucesso."});
    } catch(err) {
      return response.status(500).send({response: err});
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    try {
        await repositorioAdmin.update({id}, {data_demissao: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({response: "Administrador deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;