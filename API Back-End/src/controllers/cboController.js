import express, {request, response} from "express";
import cbo from "../entities/cbo.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioCbo = AppDataSource.getRepository(cbo);

route.get("/", async (request, response) => {
    const codigos = await repositorioCbo.find();
    return response.status(200).send({"response": codigos});
});

route.get("/encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarCbo = await repositorioCbo.findBy({descricao: Like(`%${encontrarCbo}`)});
    return response.status(200).send({"response": encontrarCbo});
});

export default route;