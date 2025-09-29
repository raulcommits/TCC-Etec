import { AppDataSource }      from "../database/data-source.js";
import { Like }               from "typeorm";
import express                from "express";
import endereco               from "../entities/endereco.js";
import zona                   from "../entities/zona.js";
import animal                 from "../entities/tipo_animal.js";
import imovel                 from "../entities/tipo_imovel.js";
import material_predominante  from "../entities/material_predominante.js";
import { authenticate } from "../utils/jwt.js";

const route = express.Router();
const repositorioEndereco = AppDataSource.getRepository(endereco);
const repositorioZona = AppDataSource.getRepository(zona);
const repositorioAnimal = AppDataSource.getRepository(animal);
const repositorioImovel = AppDataSource.getRepository(imovel);
const repositorioMaterial = AppDataSource.getRepository(material_predominante);

route.get("/me", authenticate, async (request, response) => {
   const endereco = await repositorioPaciente.findOne({
      where: {email: request.usuario.email},
      relations: ["zona", "material_predominante", "tipo_imovel", "tipo_animal"]
   });

   if (!endereco) {
      return response.status(404).send({response: "Usuário não encontrado."});
   }

   return response.status(200).send({response: endereco});
});

route.get("/", async (request, response) => {
    const enderecos = await repositorioEndereco.find();
    return response.status(200).send({response: enderecos});
});

route.get("/:encontrarLogradouro", async (request, response) => {
    const {encontrarLogradouro} = request.params;
    const encontrarEndereco = await repositorioEndereco.findBy({logradouro: Like(`%${encontrarLogradouro}`)});
    return response.status(200).send({response: encontrarEndereco});
});

route.post("/", async (request, response) => {
      const {logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia, id_zona, id_material, id_imovel, id_animal} = request.body;
      try {
         const zona = await repositorioZona.findOneBy({
            id: id_zona
         })
         if(!zona) {
            return response.status(400).send({response: "Esse endereço não foi encontrado."});
         }

         const material_predominante = await repositorioMaterial.findOneBy({
            id: id_material,
         })
         if(!material_predominante) {
            return response.status(400).send({response: "Esse material não foi encontrado."});
         }

         const tipo_imovel = await repositorioImovel.findOneBy({
            id: id_imovel
         })
         if(!tipo_imovel) {
            return response.status(400).send({response: "Esse imovel não foi encontrado."});
         }
         const tipo_animal = await repositorioAnimal.findOneBy({
            id: id_animal
         })
         if(!tipo_animal) {
            return response.status(400).send({response: "Esse animal não foi encontrado."});
         }

         const novo_endereco = repositorioEndereco.create({logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia, zona, material_predominante, tipo_imovel, tipo_animal});

         await repositorioEndereco.save(novo_endereco);
         return response.status(201).send({response: "Endereco cadastrado com sucesso.", id: novo_endereco.id});
      } catch (err) {
         console.log("Erro: ",err)
         return response.status(500).send({response: err});
      }
});   

route.put("/:id", async (request, response) => {
    const {id} = request.params;
    const {logradouro, numero, complemento, bairro, cidade, estado, cep, pais, ponto_referencia, id_zona, id_material, id_imovel, id_animal} = request.body;

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    if(logradouro.length < 3) {
        return response.status(400).send({response: "O logradouro deve conter ao menos 3 caracteres."});
    }

    if(numero.length < 1 && numero.length > 5) {
        return response.status(400).send({response: "O número deve conter entre 1 e 5 números."});
    }

    if(complemento.length < 1) {
        return response.status(400).send({response: "O complemento deve conter pelo menos 1 caractere."});
    }

    if(bairro.length < 1) {
        return response.status(400).send({response: "O bairro deve conter pelo mrnos 1 caractere."});
    }

    if(cidade.length < 1) {
        return response.status(400).send({response: "A cidade deve conter ao menos 1 caractere."});
    }

    if(estado.toUpperCase() != "AC" && estado.toUpperCase() != "AL" && estado.toUpperCase() != "AP" && estado.toUpperCase() != "AM" && estado.toUpperCase() != "BA" && estado.toUpperCase() != "CE" && estado.toUpperCase() != "DF" && estado.toUpperCase() != "ES" && estado.toUpperCase() != "GO" && estado.toUpperCase() != "MA" && estado.toUpperCase() != "MT" && estado.toUpperCase() != "MS" && estado.toUpperCase() != "MG"
    && estado.toUpperCase() != "PA" && estado.toUpperCase() != "PB" && estado.toUpperCase() != "PR" && estado.toUpperCase() != "PE" && estado.toUpperCase() != "PI" && estado.toUpperCase() != "RJ" && estado.toUpperCase() != "RN" && estado.toUpperCase() != "RS" && estado.toUpperCase() != "RO" && estado.toUpperCase() != "RR" && estado.toUpperCase() != "SC" && estado.toUpperCase() != "SP" && estado.toUpperCase() != "SE" && estado.toUpperCase() != "TO") {
        return response.status(400).send({response: "O estado deve ser uma das unidades federativas."});
    }

    if(cep.length != 8) {
        return response.status(400).send({response: "O cep deve conter 8 caracteres."});
    }

    if(pais.length < 1) {
        return response.status(400).send({response: "O país deve conter pelo menos 1 caractere."});
    }

    try {
        const zona = await repositorioZona.findOneBy({
            id: id_zona
        });
        if(!zona) {
            return response.status(400).send({response: "Essa zona não foi encontrada."});
        }
        const material = await repositorioMaterial.findOneBy({
            id: id_material
        });
        if(!material) {
            return response.status(400).send({response: "Esse material não foi encontrado."});
        }
        const imovel = await repositorioImovel.findOneBy({
            id: id_imovel
        });
        if(!imovel) {
            return response.status(400).send({response: "Esse imovel não foi encontrado."});
        }
        const animal = await repositorioAnimal.findOneBy({
            id: id_animal
        });
        if(!animal) {
            return response.status(400).send({response: "Esse animal não foi encontrado."});
        }
        await repositorioEndereco.update({id}, {logradouro, numero, complemento, bairro, cidade, estado, cep, pais, zona, material, imovel, animal});
        return response.status(200).send({response: "Endereço atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err})
    }

})

export default route;