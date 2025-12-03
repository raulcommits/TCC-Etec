import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import cbo                    from "../entities/cbo.js";

const route = express.Router();
const repositorioCbo = AppDataSource.getRepository(cbo);

route.get("/", async (request, response) => {
    const codigos = await repositorioCbo.find();
    return response.status(200).send({response: codigos});
});

route.get("/:encontrarDescricao", async (request, response) => {
    const {encontrarDescricao} = request.params;
    const encontrarCbo = await repositorioCbo.findBy({descricao: Like(`%${encontrarDescricao}`)});
    return response.status(200).send({response: encontrarCbo});
});

export default route;