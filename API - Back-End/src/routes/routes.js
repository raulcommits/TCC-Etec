// Essenciais:
import { authenticate }          from "../utils/jwt.js";
import express                   from "express";
// import registroController        from "./controllers/registroController.js";
import enderecoController        from "../controllers/enderecoController.js";
import loginController           from "../controllers/loginController.js";
import usuarioController         from "../controllers/usuarioController.js";
import usuarioCadastroController from "../controllers/usuarioCadastroController.js";

// Usuários:
// import adminController           from "../controllers/adminController.js";
import gerenteController         from "../controllers/gerenteController.js";
import agenteController          from "../controllers/agenteController.js"
// import recepcaoController        from "../controllers/recepcaoController.js"
import pacienteController        from "../controllers/pacienteController.js";

// Relacionamentos:
import animalController          from "../controllers/animalController.js";
import cboController             from "../controllers/cboController.js";
import imovelController          from "../controllers/imovelController.js";
import materialController        from "../controllers/materialController.js";
import postoController           from "../controllers/postoController.js";
import zonaController            from "../controllers/zonaController.js";


const routes = express();


//       Essenciais:
routes.use("/endereco",          authenticate, enderecoController);
routes.use("/login",             loginController);
// routes.use("/registro",          registroController);
routes.use("/usuario",           authenticate, usuarioController);
routes.use("/usuarioCadastro",   usuarioCadastroController);

//       Usuários:
// routes.use("/admin",             authenticate, adminController);
routes.use("/gerente",           authenticate, gerenteController);
routes.use("/agente",            authenticate, agenteController);
// routes.use("/recepcao",          authenticate, recepcaoController);
routes.use("/paciente",          authenticate, pacienteController);

//       Relacionamentos:
routes.use("/zona",              zonaController);
routes.use("/posto",             postoController);
routes.use("/animal",            animalController);
routes.use("/cbo",               cboController);
routes.use("/imovel",            imovelController);
routes.use("/material",          materialController);

export default routes;