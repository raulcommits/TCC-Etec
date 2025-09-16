import express, {request, response} from "express";
import log_acesso from "../entities/log_acesso.js";
import usuario from "../entities/usuario.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioAcesso = AppDataSource.getRepository(log_acesso);
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.get("/", async (request, response) => {
    const logs = await repositorioAcesso.find();
    return response.status(200).send({"response": logs});
})

route.get("encontrarLogin", async (request, response) => {
    const {encontrarLogin} = request.params;
    const encontrarLogAcesso = await repositorioAcesso.findBy({login: Like(`%${encontrarLogin}`)});
    return response.status(200).send({"response": encontrarLogAcesso});
});

export default route;