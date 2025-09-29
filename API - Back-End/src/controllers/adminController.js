import express from "express";
import administrador from "../entities/admin.js";
import posto from "../entities/postosaude.js";
import { AppDataSource } from "../database/data-source.js";
import { IsNull, Like } from "typeorm";

const route = express.Router();
const repositorioAdmin = AppDataSource.getRepository(administrador);
const repositorioPosto = AppDataSource.getRepository(posto);

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

route.post("/", async (request, response) => {
    
})