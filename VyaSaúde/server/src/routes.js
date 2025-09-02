import express from "express";
import usuarioController from "./controllers/usuarioController.js";
import loginController from "./controllers/loginController.js";
import profissionalController from "./controllers/profissionalController.js"
const routes = express();

routes.use("/usuario", usuarioController);
routes.use("/login", loginController);
routes.use("/profissional", profissionalController);

export default routes;