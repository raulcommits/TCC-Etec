import { AppDataSource } from "../database/data-source.js";
import registro from "../entities/registro_atividade.js";

const repositorioRegistro = AppDataSource.getRepository(registro);

export default async function CodigoRegistro() {
   await this.repositorioRegistro.manager.transaction(async (manager) => {
   const countHoje = await manager.count(registroVisita, {
      where: { dataVisita: hoje.toISOString().substring(0, 10) }
   });

   const sequencial = String(countHoje + 1).padStart(4, "0");
   const registroVisita = `${dataBase}${sequencial}`;

   const novoRegistro = manager.create(RegistroAtividade, {
      ...dados,
      registroVisita
   });

   await manager.save(novoRegistro);
   });
}