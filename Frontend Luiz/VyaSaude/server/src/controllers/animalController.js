import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import animal                 from "../entities/tipo_animal.js";

const route = express.Router();
const repositorioAnimal = AppDataSource.getRepository(animal);

route.get("/", async (request, response) => {
    const animais = await repositorioAnimal.find();
    return response.status(200).send({response: animais});
});

route.get("/:encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarAnimal = await repositorioAnimal.findBy({nome_animal: Like(`%${encontrarNome}`)});
    return response.status(200).send({response: encontrarAnimal});
});

export default route;