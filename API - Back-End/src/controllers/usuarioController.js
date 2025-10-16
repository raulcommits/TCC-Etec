import { AppDataSource }      from "../database/data-source.js";
import { Like, IsNull }       from "typeorm";
import express                from "express";
import usuario                from "../entities/usuario.js";
import { authenticate }       from "../utils/jwt.js";

const route = express.Router();
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.get("/", authenticate, async (request, response) => {
   const usuarios = await repositorioUsuario.find({deletedAt:IsNull()});
   return response.status(200).send({response: usuarios});
});

route.get("/:encontrarNome", async (request, response) => {
   const {encontrarNome} = request.params;
   const encontrarUsuario = await repositorioUsuario.findBy({nome: Like(`%${encontrarNome}%`)});
   return response.status(200).send({response: encontrarUsuario});
});

route.post("/", async (request, response) => {
   const {cpf, nome, email, senha, tipoUsuario} = request.body;

   const tipos_usuario = ["admin", "agente", "gerente", "paciente", "recepcao"];

   if(cpf.length != 11) {
      return response.status(400).send({response: "O CPF deve conter 11 dígitos."});
   }
   
   if(nome.length < 1) {
      return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
   }

   if(!email.includes("@")) {
      return response.status(400).send({response: "O email deve conter '@'."});
   }

   if(senha.length < 8) {
      return response.status(400).send({response: "A senha deve conter pelo menos 8 caraceteres."});
   }

   if(!tipos_usuario.includes(tipoUsuario.toLowerCase())) {
      return response.status(400).send({response: "O usuário deve ser um dos cinco tipos: 'Admin', 'Gerente', 'Agente', 'Recepcao' ou 'Paciente'."});
   }

   try {
      const novoUsuario = repositorioUsuario.create({cpf, nome, email, senha, tipoUsuario});
      await repositorioUsuario.save(novoUsuario);
      return response.status(201).send({response: "Usuário cadastrado com sucesso."});
   } catch (err) {
      return response.status(500).send({response: err});
   }
});

route.put("/:cpf", async (request, response) => {
   const {cpf} = request.params;
   const {nome, email, senha, tipoUsuario} = request.body;

   const tipos_usuario = ["admin", "agente", "gerente", "paciente", "recepcao"];

   if(cpf.length != 11) {
      return response.status(400).send({response: "O CPF deve conter 11 dígitos."});
   }

   if(nome.length < 1) {
      return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
   }
   if(!email.includes("@")) {
      return response.status(400).send({response: "O email deve conter '@'."});
   }
   if(senha.length < 8) {
      return response.status(400).send({response: "A senha deve conter pelo menos 8 caraceteres."});
   }
   if(!tipos_usuario.includes(tipoUsuario.toLowerCase())) {
      return response.status(400).send({response: "O usuário deve corresponder a um dos níveis exibidos."});
   }

   try {
      await repositorioUsuario.update({cpf}, {nome, email, senha, tipoUsuario});
      return response.status(200).send({response: "Usuário atualizado com sucesso."});
   } catch (err) {
      return response.status(500).send({response: err});
   }
});

route.delete("/:cpf", async (request, response) => {
   const {cpf} = request.params;

   if(cpf.length != 11) {
      return response.status(400).send({response: "O CPF deve conter 11 dígitos."});
   }

   try {
      await repositorioUsuario.update({cpf}, {deletedAt: () => "CURRENT_TIMESTAMP"});
      return response.status(200).send({response: "Usuário deletado com sucesso."});
   } catch (err) {
      return response.status(500).send({response: err});
   }
});

export default route;