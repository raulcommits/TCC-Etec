import { AppDataSource }      from "../database/data-source.js";
import { IsNull, Like }               from "typeorm";
import express                from "express";
import registro               from "../entities/registro_atividade.js";
import agente                 from "../entities/agente.js";
import paciente               from "../entities/paciente.js";
import endereco               from "../entities/endereco.js";

const route = express.Router();
const repositorioRegistro = AppDataSource.getRepository(registro);
const repositorioAgente = AppDataSource.getRepository(agente);
const repositorioPaciente = AppDataSource.getRepository(paciente);
const repositorioEndereco = AppDataSource.getRepository(endereco);

route.get("/", async (request, response) => {
    const registros = await repositorioRegistro.find({relations: ["endereco", "agente", "paciente"]});
    return response.status(200).send(registros);
})

route.get("/:encontrarVisita", async (request, response) => {
   const {encontrarVisita} = request.params;
   const encontrarRegistro = await repositorioRegistro.findOne({where: [
      {id: encontrarVisita}
   ],
   relations: ["endereco", "agente.posto", "paciente"]});
   
   return response.status(200).send(encontrarRegistro);
});

route.post("/cadastro", async (request, response) => {
    const {data_visita, registro_visita, motivo, desfecho, descricao, agenteId, pacienteId, enderecoId} = request.body;
    
    const motivos = ["Cadastramento/Atualização", "Visita Periódica"];
    const desfechos = ["Visita realizada", "Visita recusada", "Ausente"];

    if(registro_visita.length < 10) {
      return response.status(400).send({response: "O registro da visita deve possuir no mínimo 10 caracteres."});
    }

    if(!motivos.includes(motivo)) {
      return response.status(400).send({response: "O motivo deve corresponder a uma das opções."});
    }

    if(!desfechos.includes(desfecho)) {
      return response.status(400).send({response: "O desfecho deve corresponder a uma das opções."});
    }
    
    try {
        const agente = await repositorioAgente.findOneBy({
            id: agenteId,
            data_demissao: IsNull()
        });
        if(!agente) {
            return response.status(400).send({response: "Esse agente não foi encontrado."});
        }

        const paciente = await repositorioPaciente.findOneBy({
            id: pacienteId
        });
        if(!paciente) {
            return response.status(400).send({response: "Esse paciente não foi encontrado."});
        }

        const endereco = await repositorioEndereco.findOneBy({
            id: enderecoId
        });
        if(!endereco) {
            return response.status(400).send({response: "Esse endereço não foi encontrado."});
        }

        const texto_descricao = descricao != null ? descricao : null;
        
        const novo_registro = repositorioRegistro.create({data_visita, registro_visita, motivo, desfecho, descricao : texto_descricao, agente, paciente, endereco});
        await repositorioRegistro.save(novo_registro);
        return response.status(201).send({response: "Visita registrada com sucesso."});
    } catch(err) {
        console.log(err);
        return response.status(500).send({response: err});
    }
});

route.put("/atualizacao/:id", async (request, response) => {
    const {id} = request.params;
    const {registro_visita, motivo, desfecho, descricao, agenteId, pacienteId} = request.body;
    
    const motivos = ["Cadastramento/Atualização", "Visita Periódica"];
    const desfechos = ["Visita realizada", "Visita recusada", "Ausente"];

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser númerico."});
    }

    if(registro_visita.length < 10) {
        return response.status(400).send({response: "O registro da visita deve possuir no mínimo 10 caracteres."});
    }

    if(!motivos.includes(motivo.toLowerCase())) {
        return response.status(400).send({response: "O motivo deve corresponder a uma das opções."});
    }

    if(!desfechos.includes(desfecho.toLowerCase())) {
        return response.status(400).send({response: "O desfecho deve corresponder a uma das opções."});
    }

    try {
        const agente = await repositorioAgente.findOneBy({
            id: agenteId,
            data_demissao: IsNull()
        });
        if(!agente) {
            return response.status(400).send({response: "Esse agente não foi encontrado no sistema."});
        }

        const paciente = await repositorioPaciente.findOneBy({
            id: pacienteId
        });
        if(!paciente) {
            return response.status(400).send({response: "Esse paciente não foi encontrado no sistema."});
        }
        
        const texto_descricao = descricao != null ? descricao : null;

        await repositorioRegistro.update({id}, {data_visita, registro_visita, motivo, desfecho, descricao : texto_descricao, agente, paciente});
        return response.status(200).send({response: "Visita atualizada com sucesso."});
    } catch(err) {
        console.log(err);
        return response.status(500).send({response: err});
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    try {
        
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;