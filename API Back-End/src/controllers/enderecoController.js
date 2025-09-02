import express, { request, response } from "express";
import endereco from "../entities/endereco.js";
import zona from "../entities/zona.js";
import animal from "../entities/tipo_animal.js";
import imovel from "../entities/tipo_imovel.js";
import material_predominante from "../entities/material_predominante.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioEndereco = AppDataSource.getRepository(endereco);
const repositorioZona = AppDataSource.getRepository(zona);
const repositorioAnimal = AppDataSource.getRepository(animal);
const repositorioImovel = AppDataSource.getRepository(imovel);
const repositorioMaterial = AppDataSource.getRepository(material_predominante);

route.get("/", async (request, response) => {
    const enderecos = await repositorioEndereco.find();
    return response.status(200).send({"response": enderecos});
});

route.get("/encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarEndereco = await repositorioEndereco.findBy({logradouro: Like(`%${encontrarNome}`)});
    return response.status(200).send({"response": encontrarEndereco});
});

route.put("/:id", async (request, response) => {
    const {id} = request.params;
    const {logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia, id_zona, id_material, id_imovel, id_animal} = request.body;

    if(isNaN(id)) {
        return response.status(400).send({"response": "O id deve ser numérico."});
    }

})

export default route;