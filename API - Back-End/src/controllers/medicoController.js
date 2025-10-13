import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm";
import express, { request } from "express";
import medico from "../entities/medico.js";
import posto from "../entities/postosaude.js";
import cbo from "../entities/cbo.js";

const route = express.Router();
const repositorioMedico = AppDataSource.getRepository(medico);
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioCbo = AppDataSource.getRepository(cbo);

route.get("/", async (request, response) => {

});

route.get("/", async (request, response) => {

});

route.post("/", async (request, response) => {

});

route.put("/", async (request, response) => {

});

route.delete("/", async (request, response) => {

});

