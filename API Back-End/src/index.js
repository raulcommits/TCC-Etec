import express from "express";
import routes from "./routes.js";
import {AppDataSource} from "./database/data-source.js";

const server = express();
server.use(express.json());

server.use("/", routes);

AppDataSource.initialize().then(async () => {
    console.log("Banco de dados conectado!!");

    server.listen(3331, () => {
        console.log("Servidor está funcionando!");
    });
});