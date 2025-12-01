import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm";
import express, { request, response } from "express";
import medico from "../entities/medico.js";
import posto from "../entities/postosaude.js";
import cbo from "../entities/cbo.js";
import { authenticate } from "../utils/jwt.js";

const route = express.Router();
const repositorioMedico = AppDataSource.getRepository(medico);
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioCbo = AppDataSource.getRepository(cbo);

route.get("/", async (request, response) => {
    const medicos = await repositorioMedico.findBy({data_demissao: IsNull()});
    return response.status(200).send({response: medicos});
});

route.get("/:encontrarMedico", async (request, response) => {
   const {encontrarMedico} = request.params;
   const verificarMedico = await repositorioMedico.findOne({where: [
            {nome_medico: Like(`%${encontrarMedico}`)},
            {cpf: encontrarMedico}
   ],
      relations: ["posto", "cbo"]});

   if (!verificarMedico || verificarMedico.length === 0) {
      return response.status(404).send({response: "Agente não encontrado"})
   }

   return response.status(200).send({response: encontrarMedico});
});

route.get("/perfil", authenticate, async (request, response) => {
    const {usuario} = request;

    if(!usuario) {
        return response.status(403).send({response: "Sem permissão de acesso."});
    }

    try {
        const medico = await repositorioMedico.findOne({where:
            {cpf: usuario.cpf},
            relations: ["posto", "cbo"]
        });

        if (!medico) {
            return response.status(404).send({response: "Médico não encontrado."});
        }

        const medicoPayload = {
            ...medico,
            posto: medico.posto.nome_posto,
            cbo_codigo: medico.cbo.codigo,
            cbo_descricao: medico.cbo.descricao,
            createdAt: usuario.createdAt
        };

        return response.status(200).send(medicoPayload);
    } catch(err) {
        console.log(err);
    }
});

route.post("/", async (request, response) => {
    const {nome_medico, cpf, data_admissao, email, telefone, postoId, cboCodigo} = request.body;

    if (nome_medico.length < 3) {
        return response.status(400).send({response: "O nome deve conter no mínimo 3 caracteres."});
    }
    if (cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if (data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if (!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if (telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
    }
    
    try {
        const posto = await repositorioPosto.findOneBy({
            id: postoId
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: cboCodigo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        const novo_medico = repositorioMedico.create({nome_medico, cpf, data_admissao, email, telefone, posto, cbo});
        await repositorioMedico.save(novo_medico);
        return response.status(201).send({response: "Agente cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({response: err});
    }
});

route.put("/:id", async (request, response) => {
    const {id} = request.params;
    const {nome_medico, cpf, data_admissao, email, telefone, postoId, cboCodigo} = request.body;

    if (nome_medico.length < 3) {
        return response.status(400).send({response: "O nome deve conter no mínimo 3 caracteres."});
    }
    if (cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if (data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if (!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if (telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
    }

    try {
        const posto = await repositorioPosto.findOneBy({
            id: postoId
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: cboCodigo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        await repositorioMedico.update({id}, {nome_medico, cpf, data_admissao, email, telefone, posto, cbo});
        return response.status(200).send({response: "Médico atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err})
    }
});

route.put("atualizarMedico/:email", async (request, response) => {
   const {email} = request.params;
   const {telefone} = request.body;

   if (telefone.length < 10 && telefone.length > 11) {
      return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
   }

   try {
      await repositorioMedico.update({email}, {telefone});
      return response.status(200).send({response: "Email/telefone de médico atualizado com sucesso."});
   } catch (err) {
      return response.status(500).send({response: err});
   }
});

route.delete("/", async (request, response) => {
    const {id} = request.params;

    if (isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    try {
        await repositorioMedico.update({id}, {data_demissao: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({response: "Médico deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;