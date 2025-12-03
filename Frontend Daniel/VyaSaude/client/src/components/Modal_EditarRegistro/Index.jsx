import "./Modal_EditarRegistro.css";
import { TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Modal_EditarRegistro({onClose}) {
   const [dadosPaciente, setDadosPaciente] = useState({
      nome: '',
      nome_social: '',
      cpf: '',
      sus: '',
      data_nascimento: '',
      genero: '',
      etnia: '',
      estado_civil: '',
      nacionalidade: '',
      naturalidade_estado: '',
      naturalidade_municipio: '',
      filiacao_mae: '',
      filiacao_pai: '',
      num_telefone: '',
      email: '',
      profissao: '',
      escolaridade: '',
      nome_instituicao: '',
      tipo_instituicao: '',
      estado_clinico: '',
      responsavel_legal: '',
      leitura: '',
      escrita: '',
      endereco: '',
      cbo: '',
      cbo_descricao: '',
      cep: '',
      ponto_referencia: '',
      numero: '',
      complemento: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
      createdAt: ''
   });
   
   useEffect(() => {
      async function buscarDados() {
         try {
            const token = sessionStorage.getItem("token");
   
            const response = await api.get('/paciente/me', {
               headers: {
                  Authorization: `Bearer ${token}`  
               }
            });
   
            setDadosPaciente(response.data);
            console.log(response);
         } catch (error) {
            console.error(error);
         }
      };
      buscarDados();
   }, []);


   return (
      <div className="modal-overlay">
         <div className="modal-content">
            <div>
               <span className="h3 text-success">Sobre o paciente</span>
            </div>

            <div>
               <div>
                  <span className="h4 text-success">Registro</span>
               </div>

               <div className="form-fields">
                  <TextField disabled className="disable_input" name="nome" value={dadosPaciente.nome} type='text' label='Nome completo'/>
                  <TextField name="nome_social" value={dadosPaciente.nome_social || "Não possui/Não informado"} disabled={!dadosPaciente.nome_social} type='text' label='Nome Social'/>  
               </div>

               {/* <div className="form-fields">
                  <TextField disabled className="disable_input" name="filiacao_mae" value={dadosPaciente.filiacao_mae} type='text' label='Nome da mãe'/>
                  <TextField disabled className="disable_input" name="filiacao_pai" value={dadosPaciente.filiacao_pai} type='text' label='Nome do pai'/>
               </div> */}
               
               <div className="form-fields">
                  <TextField disabled className="disable_input" name="cpf" value={dadosPaciente.cpf} type='number' label='CPF'/>
                  {/* <TextField disabled className="disable_input" name="sus" value={dadosPaciente.sus} type='number' label='Nº SUS'/>
                  <TextField disabled className="disable_input" name="data_nascimento" value={dadosPaciente.data_nascimento} type='date' label='Data de Nascimento'/>
               </div>

               <div className="form-fields" id='dropDown-A'>
                  <TextField name="genero" value={dadosPaciente.genero} label='Gênero'/>
                  <TextField name="etnia" value={dadosPaciente.etnia} label='Etnia'/>
                  <TextField name="estado_civil" value={dadosPaciente.estado_civil} label='Estado Civil'/> */}
               </div>
            </div>

            <div>
               <div>
                  <span className="h4 text-success">Endereço atual</span>
               </div>

               {/* <div className="form-fields">
                  <TextField value={dadosPaciente.endereco.cep} type='text' label='CEP'/>
                  <TextField value={dadosPaciente.endereco.logradouro} type='text' label='Logradouro'/>
                  <TextField name="numero" value={dadosPaciente.endereco.numero} type='text' label='Número' className="compact-input"/>
               </div>

               <div className="form-fields">
                  <TextField name="complemento" value={dadosPaciente.endereco.complemento} type='text' label='Complemento'/>
                  <TextField name="ponto_referencia" value={dadosPaciente.endereco.ponto_referencia || "Não possui/Não informado"} disabled={!dadosPaciente.endereco.ponto_referencia} type='text' label='Ponto de Referência'/>
               </div>

               <div className="form-fields">
                  <TextField value={dadosPaciente.endereco.bairro} type='text' label='Bairro'/>
                  <TextField value={dadosPaciente.endereco.cidade} type='text' label='Município'/>
                  <TextField value={dadosPaciente.endereco.estado} type='text' label='UF' className="compact-input"/>
               </div> */}
            </div>

            <div>
               <div>
                  <span className="h4 text-success">Contatos</span>
               </div>
{/* 
               <div className="form-fields">
                  <TextField name="num_telefone" value={dadosPaciente.num_telefone} type='number' label='Telefone'/>                    
                  <TextField name="email" value={dadosPaciente.email} type='email' label='E-mail'/>
               </div>

               <div className="form-fields">                           
                  <TextField disabled name="nacionalidade" value={dadosPaciente.nacionalidade} label='Nacionalidade'/>
                  <TextField name="naturalidade_estado" value={dadosPaciente.naturalidade_estado} label='Estado' className="compact-input"/>
                  <TextField name="naturalidade_municipio" value={dadosPaciente.naturalidade_municipio} type='text' label='Municipio'/>
               </div> */}
            </div>

            {/* <div className="form-fields-hist_visitas">

               <TextField className="width-medium" variant="outlined" value={dadosPaciente.posto} label="Posto"/>
            </div> */}

            <p>Modal</p>
            <button className="buttonModal" onClick={onClose}>Fechar</button>
         </div>
      </div>
   )
}