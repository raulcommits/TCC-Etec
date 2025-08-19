import express from "express";
import usuarioController from "./controllers/usuarioController.js";
import loginController from "./controllers/loginController.js";

const routes = express();

routes.use("/usuario", usuarioController);
routes.use("/login", loginController);

export default routes;