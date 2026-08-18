import 'reflect-metadata';
import { DataSource } from 'typeorm';

const ambienteBanco = Boolean(process.env.MYSQL_ADDON_HOST || process.env.DATABASE_HOST);
if (!ambienteBanco) {
    console.log("Banco de dados rodando localmente.");
} else {
    console.log("Banco de dados rodando na nuvem.");
}

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_ADDON_HOST || process.env.DATABASE_HOST,
    username: process.env.MYSQL_ADDON_USER || process.env.DATABASE_USERNAME,
    port: process.env.MYSQL_ADDON_PORT || process.env.DATABASE_PORT,
    password: process.env.MYSQL_ADDON_PASSWORD || process.env.DATABASE_PASSWORD,
    database: process.env.MYSQL_ADDON_DB || process.env.DATABASE_NAME,
   //  synchronize: false, // true para sincronizar automaticamente o banco de dados com as entidades
   //  logging: true,
    entities: ["src/entities/*.js"],
    migrations: ["src/database/migrations/*.cjs"]
});

export {AppDataSource};