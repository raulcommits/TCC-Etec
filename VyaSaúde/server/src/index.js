import 'dotenv/config';
import express from "express";
import routes from "./routes/routes.js";
import {AppDataSource} from "./database/data-source.js";
import cors from "cors"

const server = express();
server.use(cors());
server.use(express.json());

server.use("/", routes);

AppDataSource.initialize().then(async () => {
   const PORT = 3331;
    server.listen(PORT, () => {
        console.log(`\nBanco de dados conectado, rodando na porta ${PORT} - http://localhost:${PORT}`);
    });
});