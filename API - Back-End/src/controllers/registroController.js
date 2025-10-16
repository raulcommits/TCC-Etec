import { AppDataSource }      from "../database/data-source.js";
import { IsNull, Like }               from "typeorm";
import express                from "express";
import registro               from "../entities/registro_atividade.qjs";
import agente                 from "../entities/agente.js";
import paciente               from "../entities/paciente.js";
import endereco               from "../entities/endereco.js";

const route = express.Router();
const repositorioRegistro = AppDataSource.getRepository(registro);
const repositorioAgente = AppDataSource.getRepository(agente);
const repositorioPaciente = AppDataSource.getRepository(paciente);
const repositorioEndereco = AppDataSource.getRepository(endereco);

route.get("/", async (request, response) => {
    const registros = await repositorioRegistro.find();
    return response.status(200).send({response: registros});
})

route.get("encontrarVisita", async (request, response) => {
    const {encontrarVisita} = request.params;
    const encontrarRegistro = await repositorioRegistro.findBy({data_visita: Like(`%${encontrarVisita}`)});
    return response.status(200).send({response: encontrarRegistro});
});

route.post("/", async (request, response) => {
    const {data_visita, registro_visita, motivo, desfecho, descricao, id_agente, id_paciente, id_endereco} = request.body;
    
    const motivos = ["Cadastramento/Atualização", "Visita Periódica"];

    if(data_visita) {

    }

    if(registro_visita.length < 10) {
        return response.status(400).send({"response": "O registro da visita deve possuir no mínimo 10 caracteres."});
    }

    if(!motivos.includes(motivo.toLowerCase())) {
        return response.status(400).send({response: "O motivo deve corresponder a uma das opções."});
    }

    if(desfecho) {

    }

    if(descricao) {

    }
    
    try {
        const agente = await repositorioAgente.findOneBy({
            id: id_agente,
            data_demissao: IsNull()
        });
        if(!agente) {
            return response.status(400).send({response: "Esse agente não foi encontrado no sistema."});
        }

        const paciente = await repositorioPaciente.findOneBy({
            id: id_paciente
        });
        if(!paciente) {
            return response.status(400).send({response: "Esse paciente não foi encontrado no sistema."});
        }

        const endereco = await repositorioEndereco.findOneBy({
            id: id_endereco
        });
        if(!endereco) {
            return response.status(400).send({response: "Esse endereço não foi encontrado."});
        }
        
        const novo_registro = repositorioRegistro.create({data_visita, registro_visita, motivo, desfecho, descricao, agente, paciente, endereco});
        
        await repositorioRegistro.save(novo_registro);
    } catch(err) {
        console.log(err);
        return response.status(500).send({response: err});
    }
});

route.put("/", async (request, response) => {
    const {id} = request.params;
    const {registro_visita, observacoes, id_agente, id_paciente} = request.body;
    
    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser númerico."});
    }

    if(registro_visita.length < 10) {
        return response.status(400).send({response: "O registro da visita deve possuir no mínimo 10 caracteres."});
    }

    try {
        const agente = await repositorioAgente.findOneBy({
            id: id_agente,
            data_demissao: IsNull()
        });
        if(!agente) {
            return response.status(400).send({response: "Esse agente não foi encontrado no sistema."});
        }

        const paciente = await repositorioPaciente.findOneBy({
            id: id_paciente
        });
        if(!paciente) {
            return response.status(400).send({response: "Esse paciente não foi encontrado no sistema."});
        }
        
        const observacao = observacoes != null ? observacoes : null;

        await repositorioRegistro.update({id}, {registro_visita, observacoes : observacao, agente, paciente});
        return response.status(200).send({response: "Registro atualizado com sucesso."});
    } catch(err) {
        console.log(err);
        return response.status(500).send({response: err});
    }
});

export default route;