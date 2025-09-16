import express, {request, response} from "express";
import registro from "../entities/registro_atividade.js";
import profissional from "../entities/profissional.js";
import paciente from "../entities/paciente.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const repositorioRegistro = AppDataSource.getRepository(registro);
const repositorioProfissional = AppDataSource.getRepository(profissional);
const repositorioPaciente = AppDataSource.getRepository(paciente);

route.get("/", async (request, response) => {
    const registros = await repositorioRegistro.find();
    return response.status(200).send({"response": registros});
})

route.get("encontrarVisita", async (request, response) => {
    const {encontrarVisita} = request.params;
    const encontrarRegistro = await repositorioRegistro.findBy({data_visita: Like(`%${encontrarVisita}`)});
    return response.status(200).send({"response": encontrarRegistro});
});

export default route;