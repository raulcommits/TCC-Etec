import { AppDataSource }      from "../database/data-source.js";
import { Like, IsNull }       from "typeorm";
import { authenticate }       from "../utils/jwt.js";
import express                from "express";
import agente                 from "../entities/agente.js";
import paciente               from "../entities/paciente.js";
import usuario                from "../entities/usuario.js";
import posto                  from "../entities/postosaude.js";
import cbo                    from "../entities/cbo.js";

const route = express.Router();
const repositorioAgente = AppDataSource.getRepository(agente);
const repositorioUsuario = AppDataSource.getRepository(usuario);
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioCbo = AppDataSource.getRepository(cbo);
const repositorioPaciente = AppDataSource.getRepository(paciente);

route.get("/", async (request, response) => {
    const agentes = await repositorioAgente.findBy({data_demissao: IsNull()});
    return response.status(200).send({response: agentes});
});

route.get("/:encontrarAgente", async (request, response) => {
   const {encontrarAgente} = request.params;
   const verificarAgente = await repositorioAgente.findOne({where: [
      {nome_agente: Like(`%${encontrarAgente}`)},
      {cpf: encontrarAgente}
   ], 
      relations: ["posto", "cbo"]});
      
   if (!verificarAgente || verificarAgente.length === 0) {
      return response.status(404).send({ message: "Agente não encontrado" });
   }
   
   return response.status(200).send(verificarAgente);
});

route.get("/perfil", authenticate, async (request, response) => {
   const {usuario} = request;

   if (!usuario) {
    return response.status(403).send({response: "Sem permissão de acesso."});
   }

   try {
    const agente = await repositorioAgente.findOne({where:
        {cpf: usuario.cpf},
        relations: ["posto", "cbo"]
    });

    if (!agente) {
        return response.status(404).send({response: "Agente não encontrado."});
    }

    const agentePayload = {
        ...agente,
        posto: agente.posto.nome_posto,
        cbo_codigo: agente.cbo.codigo,
        cbo_descricao: agente.cbo.descricao,
        createdAt: usuario.createdAt
    };

    return response.status(200).send(agentePayload); 
   } catch(err) {
    console.log(err);
   }
});

// CADASTRO DE AGENTES
route.post("/", async (request, response) => {
    const {nome_agente, cpf, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome_agente.length < 1) {
        return response.status(400).send({response: "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if(data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O telefone deve conter até 11 caracteres."});
    }
    
    try {
        const posto = await repositorioPosto.findOneBy({
            id: id_posto
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        const novo_agente = repositorioAgente.create({nome_agente, cpf, data_admissao, email, telefone, posto, cbo});
        await repositorioAgente.save(novo_agente);
        return response.status(201).send({response: "Agente cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({response: err});
    }
});

route.put("/:id", async (request, response) => {

    const {id} = request.params;
    const {nome_agente, cpf, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome_agente.length < 1) {
        return response.status(400).send({response: "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if(data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O telefone deve conter até 11 caracteres."});
    }

    try {
        const posto = await repositorioPosto.findOneBy({
            id: id_posto
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        await repositorioAgente.update({id}, {nome_agente, cpf, data_admissao, email, telefone, posto, cbo});
        return response.status(200).send({response: "Agente atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err})
    }
});

route.put("/atualizarAgente/:email", async (request, response) => {
    const {email} = request.params;
    const {telefone} = request.body;

    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O telefone deve conter até 11 caracteres."});
    }

    try {
         // teste pra saber se o dado do request.params está sendo achado
         // await repositorioAgente.findOneBy({email}).then(res => console.log("resposta agente", res))
         // console.log("email", email, "telefone", telefone)

        await repositorioAgente.update({email}, {telefone});
        return response.status(200).send({response: "Agente atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err})
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    try {
        await repositorioAgente.update({id}, {data_demissao: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({response: "Agente deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;