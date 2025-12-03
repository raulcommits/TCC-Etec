import { useState } from 'react';
import { buscarCep } from '../services/viacep';

export function useVerificarCEP(setFormDados) {
   const [cep, setCEP] = useState('');
   const [cepDados, setDados] = useState({
      logradouro: '',
      unidade: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: ''
   });
   const [erro, setErro] = useState('');

   const handleChangeCEP = async (e) => {
      const valor = e.target.value.replace(/\D/g, '');
      setCEP(valor);

      if (valor.length === 8) {
         try {
            const resultado = await buscarCep(valor);
            setDados(resultado);
            setErro('');

            setFormDados((dados) => ({
               ...dados,
               logradouro: resultado.logradouro,
               bairro: resultado.bairro,
               complemento: resultado.complemento,
               cidade: resultado.localidade,
               estado: resultado.uf,
               cep: valor
            }));

         } catch (err) {
            setErro(err.message);
            setDados({
               logradouro: '',
               unidade: '',
               complemento: '',
               bairro: '',
               localidade: '',
               uf: ''
            });
         }
         } else {
         setDados({
            logradouro: '',
            unidade: '',
            complemento: '',
            bairro: '',
            localidade: '',
            uf: ''
         });
         setErro('');
      }
   };

   return {
      cep,
      cepDados,
      erro,
      handleChangeCEP
   };
}