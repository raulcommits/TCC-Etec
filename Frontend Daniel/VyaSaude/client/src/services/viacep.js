export async function buscarCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

   try {
      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (dados.erro) {
         throw new Error('CEP não encontrado');
      }

      return {
         logradouro: dados.logradouro || '',
         bairro: dados.bairro || '',
         localidade: dados.localidade || '',
         uf: dados.uf || ''
      };
   } catch (erro) {
      throw new Error('Erro ao buscar CEP');
   }
}