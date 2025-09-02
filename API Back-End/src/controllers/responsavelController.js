import express, {request, response} from "express";
import responsavel from "../entities/responsavelposto.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioResponsavel = AppDataSource.getRepository(responsavel);

route.get("/", async (request, response) => {
    const responsaveis = await repositorioResponsavel.find();
    return response.status(200).send({"response": responsaveis});
})

route.get("encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarResponsavel = await repositorioResponsavel.findBy({nome: Like(`%${encontrarNome}`)});
    return response.status(200).send({"response": encontrarResponsavel});
});

// route.post()

export default route;