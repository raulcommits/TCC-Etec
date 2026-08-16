import express from "express";
import routes from "./routes/routes.js";
import {AppDataSource} from "./database/data-source.js";
import cors from "cors"

const server = express();
server.use(cors());
server.use(express.json());

server.use("/", routes);

AppDataSource.initialize().then(async () => {
    console.log("Banco de dados conectado!!");

    server.listen(3331, () => {
        console.log("Servidor está funcionando!");
    });
});