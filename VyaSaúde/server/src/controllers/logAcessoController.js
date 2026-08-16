import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import log_acesso             from "../entities/log_acesso.js";
import usuario                from "../entities/usuario.js";

const route = express.Router();
const repositorioAcesso = AppDataSource.getRepository(log_acesso);
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.get("/", async (request, response) => {
    const logs = await repositorioAcesso.find();
    return response.status(200).send({response: logs});
})

route.get("encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarLogAcesso = await repositorioAcesso.findBy({login: Like(`%${encontrarNome}`)});
    return response.status(200).send({response: encontrarLogAcesso});
});

export default route;