import { AppDataSource }      from "../database/data-source.js";
import { IsNull, Like }       from "typeorm";
import { authenticate }       from "../utils/jwt.js";
import express                from "express";
import paciente               from "../entities/paciente.js";
import agente                 from "../entities/agente.js";
import usuario                from "../entities/usuario.js";
import endereco               from '../entities/endereco.js';
import cbo                    from "../entities/cbo.js";

const route = express.Router();
const repositorioPaciente = AppDataSource.getRepository(paciente);
const repositorioUsuario = AppDataSource.getRepository(usuario);
const repositorioAgente = AppDataSource.getRepository(agente);
const repositorioCbo = AppDataSource.getRepository(cbo);
const repositorioEndereco = AppDataSource.getRepository(endereco);

route.get("/", async (request, response) => {
    const pacientes = await repositorioPaciente.findBy({inatividade: IsNull()});
    return response.status(200).send({response: pacientes});
});

route.get("/:encontrarPaciente", async (request, response) => {
   const {encontrarPaciente} = request.params;
   const verificarPaciente = await repositorioPaciente.findOne({where: [
      {nome: Like(`%${encontrarPaciente}`)},
      {cpf: encontrarPaciente}
   ],
   relations: ["endereco", "agente", "cbo"]});

   if (!verificarPaciente || verificarPaciente.length === 0) {
      return response.status(404).send({ message: "Paciente não encontrado" });
   }

   return response.status(200).send(verificarPaciente);
});

route.get("/perfil", authenticate, async (request, response) => {
   const dadosPaciente = await repositorioPaciente.findOne({
      where: {email: request.usuario.email},
      relations: ["endereco", "agente", "cbo"]
   });

   if (!dadosPaciente) {
      return response.status(404).send({response: "Usuário não encontrado."});
   }

   const usuario = await repositorioUsuario.findOneBy({email: request.usuario.email});
   if (!usuario) {
      return response.status(404).send({response: "Usuário não encontrado."});
   }

   const paciente = {...dadosPaciente, createdAt: usuario.createdAt}

   return response.status(200).send({response: paciente});
});

route.post("/", async (request, response) => {
   const {cpf, sus, nome, nome_social, data_nascimento, num_telefone, email, estado_civil, etnia, genero, escolaridade, 
         nacionalidade, naturalidade_estado, naturalidade_municipio, estado_clinico, responsavel_legal, filiacao_mae, filiacao_pai, 
         leitura, escrita, nome_instituicao, tipo_instituicao, id_endereco, id_agente, id_cbo } = request.body;
   
   if(cpf.length != 11) {
      return response.status(400).send({response: "O CPF deve conter 11 dígitos."});
   }

   if(sus.length != 15) {
      return response.status(400).send({response: "O Sus deve conter 15 caracteres."});
   }
      
   if(nome.length < 1) {
      return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
   }

   if(data_nascimento.length != 8) {
      return response.status(400).json({ error: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.' });
   }
   
   if(num_telefone.length < 10 || num_telefone.length > 11) {
      return response.status(400).send({response: "O numero deve conter pelo menos 10 caraceteres."});
   }
   
   if(!email.includes("@")) {
      return response.status(400).send({response: "O email deve conter '@'."});
   }

   if(etnia.length < 1) {
      return response.status(400).send({response: "A etnia deve conter pelo menos 1 caracetere."});
   }

   if(genero.length < 1) {
      return response.status(400).send({response: "O genero deve conter pelo menos 1 caracetere."});
   }
   
   if(escolaridade.length < 1) {
      return response.status(400).send({response: "A escolaridade deve conter pelo menos 1 caracetere."});
   }
   
   if(nacionalidade.length < 1) {
      return response.status(400).send({response: "A nacionalidade deve conter pelo menos 1 caracetere."});
   }
   
   if(naturalidade_estado.length < 1) {
      return response.status(400).send({response: "A naturalidade do estado deve conter pelo menos 1 caracetere."});
   }

   if(naturalidade_municipio.length < 1) {
      return response.status(400).send({response: "A naturalidade do municipio deve conter pelo menos 1 caracetere."});
   }
   if(estado_clinico.length < 1) {
      return response.status(400).send({response: "O estado clinico deve conter pelo menos 1 caracetere."});
   }

   if(responsavel_legal.length < 1) {
      return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
   }
   
   if(filiacao_mae.length < 1) {
      return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
   }

   if(filiacao_pai.length < 1) {
      return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
   }

   try {
      const endereco = await repositorioEndereco.findOneBy({
         id: id_endereco
      })
      if(!endereco) {
         return response.status(400).send({response: "Esse endereço não foi encontrado."});
      }

      const agente = await repositorioAgente.findOneBy({
         id: id_agente,
         deletedAt: IsNull()
      })
      if(!agente) {
         return response.status(400).send({response: "Esse agente não foi encontrado."});
      }

      const cbo = await repositorioCbo.findOneBy({
         codigo: id_cbo
      })
      if(!cbo) {
         return response.status(400).send({response: "Esse cbo não foi encontrado."});
      }

      const nomeSocial = nome_social != null ? nome_social : null; // Cria uma variavel chamada nomeSocial, onde verifica a variavel vinda do Front (nome_social) se ela está vazia ou tem algum valor. Se tiver, insere o valor na nomeSocial. Se não tiver, mantém vazio.

      const novo_paciente = repositorioPaciente.create({cpf, sus, nome, nome_social : nomeSocial, data_nascimento, num_telefone, email, estado_civil, etnia, genero, escolaridade, 
      nacionalidade, naturalidade_estado, naturalidade_municipio, estado_clinico, responsavel_legal, filiacao_mae, filiacao_pai, 
      leitura, escrita, nome_instituicao, tipo_instituicao, endereco, agente, cbo});
      await repositorioPaciente.save(novo_paciente);
      return response.status(201).send({response: "Paciente cadastrado com sucesso."});
   } catch (err) {
      console.log(err)
      return response.status(500).send({response: err});
   }
});

route.put("/:id", async (request, response) => {
    const {id} = request.params;
    
    const {cpf, sus, nome,nome_social, data_nascimento, num_telefone,
    email, etnia, genero, escolaridade, nacionalidade, naturalidade_estado, naturalidade_municipio,
    estado_clinico,responsavel_legal,filiacao_mae,filiacao_pai} = request.body;

    if(isNaN(id)) {
        return response.status(400).send({response: "O campo 'id' deve ser numérico."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({response: "O CPF deve conter 11 dígitos."});
    }

    if(sus.length != 15) {
        return response.status(400).send({response: "O Sus deve conter 15 caracteres."});
    }
       
    if(nome.length < 1) {
        return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
    }
    
    if(nome_social.length < 1) {
        return response.status(400).send({response: "O nome social deve conter pelo menos 1 caracetere."});
    }
    if(filiacao_mae < 1) {
        return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
    }
    if(filiacao_pai.length < 1) {
        return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
    }
    if(responsavel_legal.length < 1) {
        return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
    }
    if(estado_clinico.length < 1) {
        return response.status(400).send({response: "O estado cliico deve conter pelo menos 1 caracetere."});
    }
    if(naturalidade_estado.length < 1) {
        return response.status(400).send({response: "A naturalidade do estado deve conter pelo menos 1 caracetere."});
    }
    if(naturalidade_municipio.length < 1) {
        return response.status(400).send({response: "A naturalidade do municipio deve conter pelo menos 1 caracetere."});
    }
    if(nacionalidade.length < 1) {
        return response.status(400).send({response: "A nacionalidade deve conter pelo menos 1 caracetere."});
    }
    if(escolaridade.length < 1) {
        return response.status(400).send({response: "A escolaridade deve conter pelo menos 1 caracetere."});
    }
    if(genero.length < 1) {
        return response.status(400).send({response: "O genero deve conter pelo menos 1 caracetere."});
    }
    if(etnia.length < 1) {
        return response.status(400).send({response: "A etnia deve conter pelo menos 1 caracetere."});
    }
    if(num_telefone.length < 10) {
        return response.status(400).send({response: "O numero deve conter pelo menos 10 caraceteres."});
    }
    if (isNaN(data_nascimento.getTime())) {
        return response.status(400).json({ error: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.' });
      }
    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'."});
    }


    try {
        await repositorioPaciente.update({id}, { cpf, sus, nome,nome_social, data_nascimento, num_telefone,
         email, etnia, genero, escolaridade, nacionalidade, naturalidade_estado, naturalidade_municipio,
          estado_clinico,responsavel_legal,filiacao_mae,filiacao_pai});
        return response.status(200).send({response: "Paciente atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({response: "O campo 'id' deve ser numérico."});
    }

    try {
        await repositorioPaciente.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({response: "Paciente deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;