import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import gerente                from "../entities/gerenteposto.js";

const route = express.Router();
const repositorioGerente = AppDataSource.getRepository(gerente);

route.get("/", async (request, response) => {
    const gerentes = await repositorioGerente.find();
    return response.status(200).send({response: gerentes});
})

route.get("encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarGerente = await repositorioGerente.findBy({nome: Like(`%${encontrarNome}`)});
    return response.status(200).send({response: encontrarGerente});
});

// REVISAR ESSA ROTA
route.post("/", async (request, response) => {
   const gerente = request.body;
   const cargo = "Administrador da UBS";

   const {nome, num_telefone} = gerente;

   if(nome.length < 1) {
      return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
   }
   
   if(num_telefone.length < 10 || num_telefone.length > 11) {
      return response.status(400).send({response: "O numero deve conter pelo menos 10 caraceteres."});
   }

   try {
      const novo_gerente = repositorioGerente.create({nome, num_telefone, cargo});
      await repositorioGerente.save(novo_gerente);
   } catch (err) {
      console.log(err)
      return response.status(500).send({response: err});
   }

   return response.status(201).send({response: "Gerente cadastrado com sucesso."});
});

export default route;