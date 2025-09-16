import express from "express";
import animalController from "./controllers/animalController.js";
import cboController from "./controllers/cboController.js";
import enderecoController from "./controllers/enderecoController.js";
import imovelController from "./controllers/imovelController.js";
import loginController from "./controllers/loginController.js";
import materialController from "./controllers/materialController.js";
import pacienteController from "./controllers/pacienteController.js";
import postoController from "./controllers/postoController.js";
import profissionalController from "./controllers/profissionalController.js"
import registroController from "./controllers/registroController.js";
import responsavelController from "./controllers/responsavelController.js";
import usuarioController from "./controllers/usuarioController.js";
import zonaController from "./controllers/zonaController.js";

const routes = express();

routes.use("/animal", animalController);
routes.use("/cbo", cboController);
routes.use("/endereco", enderecoController);
routes.use("/imovel", imovelController);
routes.use("/login", loginController);
routes.use("/material", materialController);
routes.use("/paciente", pacienteController);
routes.use("/posto", postoController);
routes.use("/profissional", profissionalController);
routes.use("/registro", registroController);
routes.use("/responsavel", responsavelController);
routes.use("/usuario", usuarioController);
routes.use("/zona", zonaController);

export default routes;