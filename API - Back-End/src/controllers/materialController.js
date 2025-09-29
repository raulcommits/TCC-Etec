import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import material               from "../entities/material_predominante.js";

const route = express.Router();
const repositorioMaterial = AppDataSource.getRepository(material);

route.get("/", async (request, response) => {
    const materiais = await repositorioMaterial.find();
    return response.status(200).send({response: materiais});
})

route.get("encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarMaterial = await repositorioMaterial.findBy({nome_material: Like(`%${encontrarNome}`)});
    return response.status(200).send({response: encontrarMaterial});
});

export default route;