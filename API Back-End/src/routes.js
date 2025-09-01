import express from "express";
import usuarioController from "./controllers/usuarioController.js";
import loginController from "./controllers/loginController.js";
import profissionalController from "./controllers/profissionalController.js";
import pacienteController from "./controllers/pacienteController.js"
import postosaudeController from "./controllers/postosaudeController.js"
const routes = express();

routes.use("/usuario", usuarioController);
routes.use("/login", loginController);
routes.use("/profissional", profissionalController);
routes.use("/paciente", pacienteController)
routes.use("/postosaude", postosaudeController)
export default routes;