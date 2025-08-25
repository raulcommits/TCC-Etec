import express from "express";
import usuarioController from "./controllers/usuarioController.js";
import loginController from "./controllers/loginController.js";
import pacienteController from "./controllers/pacienteController.js";

const routes = express();

routes.use("/usuario", usuarioController);
routes.use("/login", loginController);
routes.use("/paciente", pacienteController);
export default routes;