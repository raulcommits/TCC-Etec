import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import zona                   from "../entities/zona.js";

const route = express.Router();
const repositorioZona = AppDataSource.getRepository(zona);

route.get("/", async (request, response) => {
    const zonas = await repositorioZona.find();
    return response.status(200).send({response: zonas});
})

route.get("/:encontrarNome", async (request, response) => {
   const {encontrarNome} = request.params;
   const encontrarZona = await repositorioZona.find({
      where: [
         {bairro: Like(`%${encontrarNome}`)},
         {unidade_administrativa: Like(`%${encontrarNome}`)},
         {regiao: Like(`%${encontrarNome}`)}
      ]
   });
   return response.status(200).send({response: encontrarZona});
});

export default route;