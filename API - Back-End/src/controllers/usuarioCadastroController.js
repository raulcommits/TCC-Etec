import { AppDataSource }      from "../database/data-source.js";
import { Like, IsNull }       from "typeorm";
import express                from "express";
import usuario                from "../entities/usuario.js";

const route = express.Router();
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.get("/", async (request, response) => {
   const usuarios = await repositorioUsuario.find({deletedAt:IsNull()});
   return response.status(200).send({response: usuarios});
});

route.post("/verificarDados", async (request, response) => {
   const {email, cpf} = request.body;

   try {
      const usuario = await repositorioUsuario.findOne({
         where: [
            {email: Like(`${email}`)},
            {cpf: Like(`${cpf}`)}
         ]
      });

      if (usuario) {
         return response.status(200).send({ response: "Usuário já cadastrado no sistema." });
      }
      
      return response.status(200).send({ response: "Usuário não cadastrado." });

   } catch (err) {
      console.log(err)
      return response.status(500).send({response: "Erro ao tentar verificar os dados pra realizar o cadastro", err})
   }
});

route.post("/", async (request, response) => {
   const {cpf, nome, email, senha, tipoUsuario} = request.body;

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


   if(tipoUsuario.toLowerCase() != tipoUsuario.toLowerCase() != "admin" && tipoUsuario.toLowerCase() != "gerente" && tipoUsuario.toLowerCase() != "agente" && tipoUsuario.toLowerCase() != "recepcao" && tipoUsuario.toLowerCase() != "paciente") {
      return response.status(400).send({response: "O usuário deve ser um dos cinco tipos: 'Admin', 'Gerente', 'Agente', 'Recepcao' ou 'Paciente'."});
   }

   try {
      const novoUsuario = repositorioUsuario.create({cpf, nome, email, senha, tipoUsuario});
      await repositorioUsuario.save(novoUsuario);
      return response.status(201).send({response: "Usuário cadastrado com sucesso."});
   } catch (err) {
      console.log(err)
      return response.status(500).send({response: err});
   }
});

route.put("/:cpf", async (request, response) => {
   const {cpf} = request.params;
   const {nome, email, senha, tipoUsuario} = request.body;

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
   if(tipoUsuario.toLowerCase() != tipoUsuario.toLowerCase() != "admin" && tipoUsuario.toLowerCase() != "gerente" && tipoUsuario.toLowerCase() != "agente" && tipoUsuario.toLowerCase() != "recepcao" && tipoUsuario.toLowerCase() != "paciente") {
      return response.status(400).send({response: "O usuário deve ser um dos três tipos: 'Paciente'; 'Agente'; 'Admin'."});
   }

   try {
      await repositorioUsuario.update({cpf}, {nome, email, senha, tipoUsuario});
      return response.status(200).send({response: "Usuário atualizado com sucesso."});
   } catch (err) {
      return response.status(500).send({response: err});
   }
});

// route.delete("/:cpf", async (request, response) => {
//    const {cpf} = request.params;

//    if(cpf.length != 11) {
//       return response.status(400).send({response: "O CPF deve conter 11 dígitos."});
//    }

//    try {
//       await repositorioUsuario.update({cpf}, {deletedAt: () => "CURRENT_TIMESTAMP"});
//       return response.status(200).send({response: "Usuário deletado com sucesso."});
//    } catch (err) {
//       return response.status(500).send({response: err});
//    }
// });

export default route;