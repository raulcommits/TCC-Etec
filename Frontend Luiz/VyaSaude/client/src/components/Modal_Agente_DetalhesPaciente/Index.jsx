import "./Modal_Agente_DetalhesPaciente.css";
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material'
import { PatternFormat } from "react-number-format";

import { GoX } from "react-icons/go";

export default function Modal_Agente_DetalhesPaciente({onClose, pacienteId}) {
   const [handleNomeSocial, setHandleNomeSocial] = useState(false);
   const [handleResponsavelLegal, setHandleResponsavelLegal] = useState(false);
   const [handleProfissao, setHandleProfissao] = useState(false);
   const [handlePontoReferencia, setHandlePontoReferencia] = useState(false);
   const [handleAnimal, setHandleAnimal] = useState(false);


   const [dadosPaciente, setDadosPaciente] = useState({
      id: '',
      cpf: '',
      nome: '',
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
      telefone: '',
      email: '',
      profissao: '',
      escolaridade: '',
      nome_instituicao: '',
      tipo_instituicao: '',
      estado_clinico: '',
      responsavel_legal: '',
      leitura: '',
      escrita: '',      
   });
   
   const [dadosEndereco, setDadosEndereco] = useState({
      // enderecoId: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: '',
      ponto_referencia: '',
      tipo_animal: { nome_animal: '' },
      tipo_imovel: { nome_imovel: '' },
      material_predominante: { nome_material: '' }
   });
   

   const handleFormChange = (e) => {
      const {name, value} = e.target;
      
      setNovoRegistro((dados) => ({
         ...dados,
         [name]: value
      }));
   };

   
   useEffect(() => {
      async function buscarRegistro() {
         try {
            const resposta = await api.get(`/paciente/${pacienteId}`)
            console.log("Resposta do paciente: ", resposta.data);
            setDadosPaciente(resposta.data);
            setDadosEndereco(resposta.data.endereco);
            console.log("Imovel: ", resposta.data.endereco?.tipo_imovel?.nome_imovel);
         }
         catch (err) {
            console.log(err);
         }
      }
      buscarRegistro();
   }, [pacienteId]);


   useEffect(() => {
      setHandleNomeSocial(dadosPaciente.nome_social ? true : false);
      setHandleResponsavelLegal(dadosPaciente.responsavel_legal ? true : false);
      setHandleProfissao(dadosPaciente.profissao ? true : false);
      setHandleAnimal(dadosEndereco.tipo_animal ? true : false);
      setHandlePontoReferencia(dadosEndereco.ponto_referencia ? true : false);
   });

   
   useEffect(() => {
      console.log("Busca pelo paciente: ", dadosPaciente);
   }, [dadosPaciente]);
   
      
   return (
      <div className="modal-overlay">
         <div className="content-modal-agente-detalhesPaciente">
            <div className="titulo">
               <span className="h3">Detalhes sobre o paciente</span>
               <div className="fechar" onClick={onClose}>
                  <GoX color="var(--bs-success-rgb)"/>
               </div>
            </div>

            <div className="elements-modal-agente-detalhesPaciente">
               <span className="subtitulo h5 text-success">Dados de Registro do Paciente</span>
               <div className="grid grid_5">
                  <TextField name="nome" label="Nome do Paciente" variant="outlined" value={dadosPaciente.nome} onChange={(e) => handleFormChange(e)}/>
                  <TextField disabled={!handleNomeSocial} name="nome_social" label="Nome Social" variant="outlined" value={dadosPaciente.nome_social ? dadosPaciente.nome_social : "Não possui"} onChange={(e) => handleFormChange(e)}/>
               </div>

               <div className="grid grid_5">
                  <PatternFormat name="cpf" label="CPF do Paciente" variant="outlined" format="###.###.###-##" mask=" " customInput={TextField} value={dadosPaciente.cpf} onChange={(e) => handleFormChange(e)}/>
                  <PatternFormat name="sus" label="Nº SUS" variant="outlined" format="### #### #### ###" mask=" " customInput={TextField} value={dadosPaciente.sus} onChange={(e) => handleFormChange(e)}/>
               </div>

               <div className="grid grid_5">
                  <TextField name="filiacao_mae" label="Nome da mãe" variant="outlined" value={dadosPaciente.filiacao_mae} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="filiacao_pai" label="Nome do pai" variant="outlined" value={dadosPaciente.filiacao_pai} onChange={(e) => handleFormChange(e)}/>
               </div>

               <div className="grid grid_4">
                  <TextField name="data_nascimento" label="Data de Nascimento" variant="outlined"  value={new Date(dadosPaciente.data_nascimento).toLocaleDateString('pt-BR')} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="genero" label="Gênero" variant="outlined" value={dadosPaciente.genero} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="etnia" label="Etnia" variant="outlined" value={dadosPaciente.etnia} onChange={(e) => handleFormChange(e)}/>
               </div>

               <div className="grid grid_4">
                  <TextField name="nacionalidade" label="Nacionalidade" variant="outlined" value={dadosPaciente.nacionalidade} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="naturalidade_estado" label="Naturalidade (Estado)" variant="outlined" value={dadosPaciente.naturalidade_estado} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="naturalidade_municipio" label="Naturalidade (Municipio)" variant="outlined"  value={dadosPaciente.naturalidade_municipio} onChange={(e) => handleFormChange(e)}/>
               </div>

               <hr/>

               <span className="subtitulo h5 text-success">Dados pessoais</span>
               <div className="grid grid_5">
                  <TextField disabled={!handleResponsavelLegal} name="responsavel_legal" label="Responsável Legal" variant="outlined" value={dadosPaciente.responsavel_legal ? dadosPaciente.responsavel_legal : "Não aplicável"} onChange={(e) => handleFormChange(e)}/>
                  <TextField disabled={!handleProfissao} name="profissao" label="Profissão" variant="outlined" value={dadosPaciente.profissao ? dadosPaciente.profissao : "Desempregado"} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="estado_clinico" label="Estado Clínico" variant="outlined" value={dadosPaciente.estado_clinico} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="estado_civil" label="Estado Cívil" variant="outlined"  value={dadosPaciente.estado_civil} onChange={(e) => handleFormChange(e)}/>
               </div>

               <hr/>

               <span className="subtitulo h5 text-success">Alfabetização</span>
               <div className="grid grid_5">
                  <TextField name="leitura" label="Saber ler" variant="outlined" value={dadosPaciente.leitura = true ? 'Sim' : 'Não'} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="escrita" label="Saber Escrever" variant="outlined" value={dadosPaciente.escrita = true ? 'Sim' : 'Não'} onChange={(e) => handleFormChange(e)}/>
               </div>

               <hr/>

               <span className="subtitulo h5 text-success">Contatos</span>
               <div className="grid grid_2">
                  <TextField name="email" label="E-mail" variant="outlined" value={dadosPaciente.email} onChange={(e) => handleFormChange(e)}/>
                  <PatternFormat name="telefone" label="Telefone" variant="outlined" value={dadosPaciente.telefone} format={(dadosPaciente.telefone || "").replace(/\D/g, '').length > 10 ? "(##) # ####-####" : "(##) ####-####"} mask=" " customInput={TextField}/>
               </div>

               <div className="grid grid_4">
                  <TextField name="escolaridade" label="Escolaridade" variant="outlined" value={dadosPaciente.escolaridade} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="nome_instituicao" label="Nome da Instituição" variant="outlined" value={dadosPaciente.nome_instituicao} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="tipo_instituicao" label="Tipo de Instituição" variant="outlined" value={dadosPaciente.tipo_instituicao} onChange={(e) => handleFormChange(e)}/>
               </div>
               
               <hr/>

               <span className="subtitulo h5 text-success">Dados do Endereço</span>
               <div className="grid grid_4">
                  <TextField name="bairro" label="Bairro" variant="outlined" value={dadosEndereco.bairro} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="cidade" label="Cidade" variant="outlined" value={dadosEndereco.cidade} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="estado" label="Estado" variant="outlined" value={dadosEndereco.estado} onChange={(e) => handleFormChange(e)}/>
               </div>
               
               <div className="grid grid_2">
                  <TextField name="logradouro" label="Logradouro" variant="outlined"  value={dadosEndereco.logradouro} onChange={(e) => handleFormChange(e)}/>
                  <PatternFormat name="numero" label="Número" value={dadosEndereco.numero} format={(dadosEndereco.numero || "").replace(/\D/g, '').length > 3 ? "#.###" : "###"} mask=" " customInput={TextField} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                  <TextField name="complemento" label="Complemento" variant="outlined" value={dadosEndereco.complemento} onChange={(e) => handleFormChange(e)}/>
                  <PatternFormat name="cep" label="CEP" variant="outlined" format="#####-###" mask=" " customInput={TextField} value={dadosEndereco.cep} onChange={(e) => handleFormChange(e)}/>
                  <TextField disabled={!handlePontoReferencia} name="ponto_referencia" label="Ponto de Referência" variant="outlined" value={dadosEndereco.ponto_referencia ? dadosEndereco.ponto_referencia : "Não possui/Não informado"} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="pais" label="Pais" variant="outlined"  value={dadosEndereco.pais} onChange={(e) => handleFormChange(e)}/>
               </div>

               <hr/>

               <span className="subtitulo h5 text-success">Dados da Residencia</span>
               <div className="grid grid_4">
                  <TextField disabled={!handleAnimal} name="nome_animal" label="Possui animais" variant="outlined" value={dadosEndereco?.tipo_animal ? "Possui" : "Não possui"} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="nome_imovel" label="Tipo de Imóvel" variant="outlined" value={dadosEndereco?.tipo_imovel?.nome_imovel} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="nome_material" label="Material do Imóvel" variant="outlined" value={dadosEndereco?.material_predominante?.nome_material} onChange={(e) => handleFormChange(e)}/>
               </div>

               <hr/>

               <div className="button-modal_novoRegistro">
                  <Button variant="outline-success" onClick={onClose}>Fechar</Button>
               </div>
            </div>
         </div>
      </div>
   )
}