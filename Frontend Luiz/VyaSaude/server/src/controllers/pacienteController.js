import { AppDataSource }      from "../database/data-source.js";
import { IsNull, Like }       from "typeorm";
import { authenticate }       from "../utils/jwt.js";
import express                from "express";
import paciente               from "../entities/paciente.js";
import agente                 from "../entities/agente.js";
import usuario                from "../entities/usuario.js";
import endereco               from '../entities/endereco.js';

const route = express.Router();
const repositorioPaciente = AppDataSource.getRepository(paciente);
const repositorioUsuario = AppDataSource.getRepository(usuario);
const repositorioAgente = AppDataSource.getRepository(agente);
const repositorioEndereco = AppDataSource.getRepository(endereco);

route.get("/", async (request, response) => {
    const pacientes = await repositorioPaciente.findBy({inatividade: IsNull()});
    return response.status(200).send({response: pacientes});
});

route.get("/:encontrarPaciente", async (request, response) => {
   const {encontrarPaciente} = request.params;
   const verificarPaciente = await repositorioPaciente.findOne({
      where: [
         {email: encontrarPaciente},
         {cpf: encontrarPaciente}
      ],
      relations: ["agente", "endereco", "endereco.zona", "endereco.material_predominante", "endereco.tipo_imovel", "endereco.tipo_animal"]
   });
   console.log(encontrarPaciente)

   if (!verificarPaciente) {
      return response.status(404).send({ response: "Paciente não encontrado" });
   }

   return response.status(200).send(verificarPaciente);
});

route.get("/perfil", authenticate, async (request, response) => {
   const dadosPaciente = await repositorioPaciente.findOne({
      where: {email: request.usuario.email},
      relations: ["endereco", "agente"]
   });

   if (!dadosPaciente) {
      return response.status(404).send({response: "Usuário não encontrado."});
   }

   const usuario = await repositorioUsuario.findOneBy({email: request.usuario.email});
   if (!usuario) {
      return response.status(404).send({response: "Usuário não encontrado."});
   }

   const paciente = {...dadosPaciente, data_criacao: usuario.data_criacao}

   return response.status(200).send({response: paciente});
});

route.post("/", async (request, response) => {
   const {cpf, sus, nome, nome_social, data_nascimento, genero, etnia, estado_civil, nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae,
   filiacao_pai, telefone, email, escolaridade, nome_instituicao, tipo_instituicao, estado_clinico, leitura, escrita, responsavel_legal,
   enderecoId, agenteId, profissao } = request.body;
   
   if (cpf.length != 11) {
      return response.status(400).send({response: "O número do CPF deve conter 11 dígitos."});
   }

   if (sus.length != 15) {
      return response.status(400).send({response: "O número do Sus deve conter 15 dígitos."});
   }
      
   if (nome.length < 3) {
      return response.status(400).send({response: "O nome deve conter pelo menos 3 caraceteres."});
   }

   if (data_nascimento.length != 10) {
      return response.status(400).json({ error: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.' });
   }
   
   if (genero.length < 3) {
      return response.status(400).send({response: "O genero deve conter pelo menos 3 caraceteres."});
   }
   
   if (etnia.length < 3) {
      return response.status(400).send({response: "A etnia deve conter pelo menos 3 caraceteres."});
   }

   if (estado_civil.length < 5) {
      return response.status(400).send({response: "O estado cívil deve conter 5 caracteres."});
   }
   
   if (nacionalidade.length < 3) {
      return response.status(400).send({response: "A nacionalidade deve conter pelo menos 3 caraceteres."});
   }
   
   if (naturalidade_estado.length !== 2) {
      return response.status(400).send({response: "A naturalidade do estado deve conter 2 caraceteres."});
   }
   
   if (naturalidade_municipio.length < 3) {
      return response.status(400).send({response: "A naturalidade do municipio deve conter pelo menos 3 caraceteres."});
   }

   if (filiacao_mae.length < 3) {
      return response.status(400).send({response: "O nome da mãe deve conter pelo menos 3 caraceteres."});
   }
   
   if (filiacao_pai.length < 3) {
      return response.status(400).send({response: "O nome do pai deve conter pelo menos 3 caraceteres."});
   }
   if (telefone.length < 10 || telefone.length > 11) {
      return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)."});
   }
   
   if (!email.includes("@")) {
      return response.status(400).send({response: "O email deve conter '@'."});
   }
   if (escolaridade.length < 3) {
      return response.status(400).send({response: "A escolaridade deve conter pelo menos 1 caracetere."});
   }

   if (nome_instituicao.length < 3) {
      return response.status(400).send({response: "O nome da instituição deve conter pelo menos 3 caracteres."});
   }

   if (tipo_instituicao.length < 3) {
      return response.status(400).send({response: "O tipo da instituição deve conter pelo menos 3 caracteres."});
   }

   if (estado_clinico.length < 3) {
      return response.status(400).send({response: "O estado clinico deve conter pelo menos 3 caraceteres."});
   }

   if (leitura.length < 3) {
      return response.status(400).send({response: "O nível de leitura deve conter pelo menos 3 caracteres."});
   }

   if (escrita.length < 3) {
      return response.status(400).send({response: "O nível de escrita deve conter pelo menos 3 caracteres."});
   }
   
   try {
      const endereco = await repositorioEndereco.findOneBy({
         id: enderecoId
      })
      if(!endereco) {
         return response.status(400).send({response: "Esse endereço não foi encontrado."});
      }

      const agente = await repositorioAgente.findOneBy({
         id: agenteId,
         data_demissao: IsNull()
      })
      if(!agente) {
         return response.status(400).send({response: "Esse agente não foi encontrado."});
      }

      const nomeSocial = nome_social != null ? nome_social : null; // Cria uma variavel chamada nomeSocial, onde verifica a variavel vinda do Front (nome_social) se ela está vazia ou tem algum valor. Se tiver, insere o valor na nomeSocial. Se não tiver, mantém vazio.
      const responsavelLegal = responsavel_legal != null ? responsavel_legal : null;
      
      const novo_paciente = repositorioPaciente.create({cpf, sus, nome, nome_social : nomeSocial, data_nascimento: new Date(data_nascimento + 'T12:00:00'), genero, etnia, estado_civil, nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae, filiacao_pai, telefone,
      email, escolaridade, nome_instituicao, tipo_instituicao, estado_clinico, leitura, escrita, responsavel_legal: responsavelLegal, endereco, agente, profissao});
      await repositorioPaciente.save(novo_paciente);
      console.log(novo_paciente)
      return response.status(201).send({response: "Paciente cadastrado com sucesso."});
   } catch (err) {
      console.log(err)
      return response.status(500).send({response: err});
   }
});

route.put("/:id", async (request, response) => {
   const {id} = request.params;

   const {cpf, sus, nome, nome_social, data_nascimento, genero, etnia, estado_civil, nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae,
   filiacao_pai, telefone, email, escolaridade, nome_instituicao, tipo_instituicao, estado_clinico, leitura, escrita, responsavel_legal,
   enderecoId, agenteId, profissao } = request.body;
   
   if (cpf.length != 11) {
      return response.status(400).send({response: "O número do CPF deve conter 11 dígitos."});
   }

   if (sus.length != 15) {
      return response.status(400).send({response: "O número do Sus deve conter 15 dígitos."});
   }
      
   if (nome.length < 3) {
      return response.status(400).send({response: "O nome deve conter pelo menos 3 caraceteres."});
   }

   if (data_nascimento.length != 8) {
      return response.status(400).json({ error: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.' });
   }
   
   if (genero.length < 3) {
      return response.status(400).send({response: "O genero deve conter pelo menos 3 caraceteres."});
   }
   
   if (etnia.length < 3) {
      return response.status(400).send({response: "A etnia deve conter pelo menos 3 caraceteres."});
   }

   if (estado_civil.length < 5) {
      return response.status(400).send({response: "O estado cívil deve conter 5 caracteres."});
   }
   
   if (nacionalidade.length < 3) {
      return response.status(400).send({response: "A nacionalidade deve conter pelo menos 3 caraceteres."});
   }
   
   if (naturalidade_estado.length !== 2) {
      return response.status(400).send({response: "A naturalidade do estado deve conter 2 caraceteres."});
   }
   
   if (naturalidade_municipio.length < 3) {
      return response.status(400).send({response: "A naturalidade do municipio deve conter pelo menos 3 caraceteres."});
   }

   if (filiacao_mae.length < 3) {
      return response.status(400).send({response: "O nome da mãe deve conter pelo menos 3 caraceteres."});
   }
   
   if (filiacao_pai.length < 3) {
      return response.status(400).send({response: "O nome do pai deve conter pelo menos 3 caraceteres."});
   }
   if (telefone.length < 10 && telefone.length > 11) {
      return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)"});
   }
   
   if (!email.includes("@")) {
      return response.status(400).send({response: "O email deve conter '@'."});
   }
   if (escolaridade.length < 3) {
      return response.status(400).send({response: "A escolaridade deve conter pelo menos 1 caracetere."});
   }

   if (nome_instituicao.length < 3) {
      return response.status(400).send({response: "O nome da instituição deve conter pelo menos 3 caracteres."});
   }

   if (tipo_instituicao.length < 3) {
      return response.status(400).send({response: "O tipo da instituição deve conter pelo menos 3 caracteres."});
   }

   if (estado_clinico.length < 3) {
      return response.status(400).send({response: "O estado clinico deve conter pelo menos 3 caraceteres."});
   }

   if (leitura.length < 3) {
      return response.status(400).send({response: "O nível de leitura deve conter pelo menos 3 caracteres."});
   }

   if (escrita.length < 3) {
      return response.status(400).send({response: "O nível de escrita deve conter pelo menos 3 caracteres."});
   }
   
   
   try {
      const endereco = await repositorioEndereco.findOneBy({
         id: enderecoId
      })
      if(!endereco) {
         return response.status(400).send({response: "Esse endereço não foi encontrado."});
      }

      const agente = await repositorioAgente.findOneBy({
         id: agenteId,
         data_demissao: IsNull()
      })
      if(!agente) {
         return response.status(400).send({response: "Esse agente não foi encontrado."});
      }

      const nomeSocial = nome_social != null ? nome_social : null; // Cria uma variavel chamada nomeSocial, onde verifica a variavel vinda do Front (nome_social) se ela está vazia ou tem algum valor. Se tiver, insere o valor na nomeSocial. Se não tiver, mantém vazio.
      const responsavelLegal = responsavel_legal != null ? responsavel_legal : null;

      await repositorioPaciente.update({id}, {cpf, sus, nome, nome_social : nomeSocial, data_nascimento, genero, etnia, estado_civil, nacionalidade, naturalidade_estado, naturalidade_municipio, filiacao_mae, filiacao_pai, telefone,
      email, escolaridade, nome_instituicao, tipo_instituicao, estado_clinico, leitura, escrita, responsavel_legal: responsavelLegal, endereco, agente, profissao});
      return response.status(201).send({response: "Paciente atualizado com sucesso."});
   } catch (err) {
      console.log(err)
      return response.status(500).send({response: err});
   }
});

route.put("atualizarPaciente/:email", async (request, response) => {
   const {email} = request.params;
   const {telefone} = request.body;

   if (telefone.length < 10 && telefone.length > 11) {
      return response.status(400).send({response: "O numero deve conter entre 10 e 11 caracteres (incluindo DDD)"});
   }

   try {
      await repositorioPaciente.update({email}, {telefone});
      return response.status(200).send({response: "O email/telefone do paciente foi atualizado com sucesso."});
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
        await repositorioPaciente.update({id}, {inatividade: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({response: "Paciente deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;