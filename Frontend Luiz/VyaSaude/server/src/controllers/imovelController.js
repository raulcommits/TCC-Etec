import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import imovel                 from "../entities/tipo_imovel.js";

const route = express.Router();
const repositorioImovel = AppDataSource.getRepository(imovel);

route.get("/", async (request, response) => {
    const imoveis = await repositorioImovel.find();
    return response.status(200).send({response: imoveis});
})

route.get("encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarImovel = await repositorioImovel.findBy({nome_imovel: Like(`%${encontrarNome}`)});
    return response.status(200).send({response: encontrarImovel});
});

export default route;