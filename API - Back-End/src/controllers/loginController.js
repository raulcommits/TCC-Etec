// TEXTOS COMENTADOS são pontos onde está usando bcrypt. Pra realizar os testes, foi desativado essa parte pra ser implantado com mais atenção num momento posterior.
import { AppDataSource }               from "../database/data-source.js";
import { IsNull }                      from "typeorm";
import express                         from "express";
import usuario                         from "../entities/usuario.js";
import agente                          from "../entities/agente.js";
import paciente                        from "../entities/paciente.js";
// import bcrypt                          from 'bcrypt';   
import { enviarEmail }                 from "../helpers/nodemailer.js";
import { authenticate, generateToken } from "../utils/jwt.js";
import { generateNewPassword }         from "../utils/login.js";

const route = express.Router();
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.get("/me", authenticate, async (request, response) => {
   const usuario = await repositorioUsuario.findOneBy({email: request.usuario.email});

   if (!usuario) {
      return response.status(404).send({response: "Usuário não encontrado."});
   }

   return response.status(200).send({
      nome: usuario.nome,
      nome_social: usuario.nome_social,
      cpf: usuario.cpf,
      email: usuario.email,
      tipoUsuario: usuario.tipoUsuario,
      createdAt: usuario.createdAt
   });
});

route.post("/", async (request, response) => {
   let {email, senha} = request.body;

   email = email.toLowerCase().trim(); // Caracteres minusculos, e remoção de espaços em branco no começo e fim

   try {
      if(!email.includes("@")) {
         return response.status(400).send({response: "Verifique o formato do e-mail."});
      }

      const usuario = await repositorioUsuario.findOneBy({
         email, senha, deletedAt: IsNull()
      });
      
      if(!usuario) {
         return response.status(401).send({response: "Usuário não encontrado. Verifique as credenciais e tente novamente."});
      }

      // const senhaValida = await bcrypt.compare(senha, usuario.senha);

      const token = generateToken({
         id: usuario.id,
         nome: usuario.nome,
         email: usuario.email,
         tipoUsuario: usuario.tipoUsuario
      });

      return response.status(200).send({response: "Login efetuado com sucesso.", token});
   } catch(error) {
      console.log(error)
   }
});

route.put("/nova-senha", async (request, response) => {
   const {email} = request.body;

   const usuario = await repositorioUsuario.findOneBy({
      email, deletedAt: IsNull()
   });

   if(!usuario) {
      return response.status(400).send({response: "Email inválido."});
   }

   const novaSenha = generateNewPassword();
   
   await repositorioUsuario.update({email}, {senha: novaSenha});

   enviarEmail(novaSenha, usuario.email, usuario.nome);

   return response.status(200).send({response: "Senha enviada ao email cadastrado."});
});

export default route;