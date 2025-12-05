import "./Modal_Agente_DetalhesPaciente.css";
import api from '../../services/api';
import { getUser } from "../../helpers/auth"
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material'
import { PatternFormat } from "react-number-format";

import { GoX } from "react-icons/go";

export default function Modal_Agente_DetalhesPaciente({onClose, pacienteId}) {
   const [usuario, setUsuario] = useState(undefined);
   const [modoEdicao, setModoEdicao] = useState(false);

   useEffect(() => {
      const response = getUser();
      setUsuario(response);
   }, []);


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

   
   const [dadosParaAtualizarPaciente, setDadosParaAtualizarPaciente] = useState({
      cpf: '', // chave primaria
      nome: '',
      nome_social: '',
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

   const [dadosParaAtualizarEndereco, setDadosParaAtualizarEndereco] = useState({
      enderecoId: '', // chave primaria
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

   
   useEffect(() => {
      async function buscarRegistro() {
         try {
            const resposta = await api.get(`/paciente/${pacienteId}`)
            console.log("Resposta do paciente: ", resposta.data);
            setDadosPaciente(resposta.data);
            setDadosEndereco(resposta.data.endereco);
            setDadosParaAtualizarPaciente(resposta.data);
            setDadosParaAtualizarEndereco(resposta.data.endereco);
         }
         catch (err) {
            console.log(err);
         }
      }
      buscarRegistro();
   }, [pacienteId]); 

   const handlePacienteChange = (e) => {
      const { name, value } = e.target;
      setDadosParaAtualizarPaciente((dados) => ({ ...dados, [name]: value }));
   };

   const handleEnderecoChange = (e) => {
      const { name, value } = e.target;
      setDadosParaAtualizarEndereco((dados) => ({ ...dados, [name]: value }));
   };

   const handleCancelar = () => {
      // Restaura os dados do formulário usando o backup original
      setDadosParaAtualizarPaciente(dadosPaciente);
      setDadosParaAtualizarEndereco(dadosEndereco);
      
      // Sai do modo de edição
      setModoEdicao(false);
   };


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


   async function atualizarDados() {
      if (!usuario?.cpf) return;

      try {
         const payloadEndereco = {
            ...dadosParaAtualizarEndereco,
            zonaId: dadosParaAtualizarEndereco.zona?.id,
            materialId: dadosParaAtualizarEndereco.material_predominante?.id,
            imovelId: dadosParaAtualizarEndereco.tipo_imovel?.id,
            animalId: dadosParaAtualizarEndereco.tipo_animal?.id
         };
   
         await api.put(`/endereco/${dadosParaAtualizarEndereco.id}`, payloadEndereco);

         const payloadPaciente = {
            ...dadosParaAtualizarPaciente,
            enderecoId: dadosParaAtualizarEndereco.id,
            agenteId: dadosParaAtualizarPaciente.agente?.id
         };

         payloadPaciente.telefone = payloadPaciente.telefone ? payloadPaciente.telefone.replace(/\D/g, '') : '';
         payloadPaciente.cpf = payloadPaciente.cpf.replace(/\D/g, '');

         await api.put(`/paciente/${dadosParaAtualizarPaciente.id}`, payloadPaciente);

         toast.success('Paciente alterado com sucesso.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
         });

         setDadosPaciente(dadosParaAtualizarPaciente);
         setDadosEndereco(dadosParaAtualizarEndereco);

         setModoEdicao(false);
      }
      catch (error) {
         console.log(error);
         toast.error('Erro ao alterar o paciente. Verifique os dados e tente novamente.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
         });
      }
   }
   
   useEffect(() => {
      console.log("dadosParaAtualizarPaciente", dadosParaAtualizarPaciente);
   }, [dadosParaAtualizarPaciente]);
   
   useEffect(() => {
      console.log("dadosParaAtualizarEndereco", dadosParaAtualizarEndereco);
   }, [dadosParaAtualizarEndereco]);
      
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
                  <TextField disabled={!modoEdicao} name="nome" label="Nome do Paciente" variant="outlined" value={dadosParaAtualizarPaciente.nome} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="nome_social" label="Nome Social" variant="outlined" value={dadosParaAtualizarPaciente.nome_social ? dadosParaAtualizarPaciente.nome_social : "Não possui"} onChange={handlePacienteChange}/>
               </div>

               <div className="grid grid_5">
                  <PatternFormat disabled={!modoEdicao} name="cpf" label="CPF do Paciente" variant="outlined" format="###.###.###-##" mask=" " customInput={TextField} value={dadosParaAtualizarPaciente.cpf} onChange={handlePacienteChange}/>
                  <PatternFormat disabled={!modoEdicao} name="sus" label="Nº SUS" variant="outlined" format="### #### #### ###" mask=" " customInput={TextField} value={dadosParaAtualizarPaciente.sus} onChange={handlePacienteChange}/>
               </div>

               <div className="grid grid_5">
                  <TextField disabled={!modoEdicao} name="filiacao_mae" label="Nome da mãe" variant="outlined" value={dadosParaAtualizarPaciente.filiacao_mae} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="filiacao_pai" label="Nome do pai" variant="outlined" value={dadosParaAtualizarPaciente.filiacao_pai} onChange={handlePacienteChange}/>
               </div>

               <div className="grid grid_4">
                  <TextField disabled={!modoEdicao} name="data_nascimento" label="Data de Nascimento" variant="outlined"  value={new Date(dadosParaAtualizarPaciente.data_nascimento).toLocaleDateString('pt-BR')} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="genero" label="Gênero" variant="outlined" value={dadosParaAtualizarPaciente.genero} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="etnia" label="Etnia" variant="outlined" value={dadosParaAtualizarPaciente.etnia} onChange={handlePacienteChange}/>
               </div>

               <div className="grid grid_4">
                  <TextField disabled={!modoEdicao} name="nacionalidade" label="Nacionalidade" variant="outlined" value={dadosParaAtualizarPaciente.nacionalidade} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="naturalidade_estado" label="Naturalidade (Estado)" variant="outlined" value={dadosParaAtualizarPaciente.naturalidade_estado} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="naturalidade_municipio" label="Naturalidade (Municipio)" variant="outlined"  value={dadosParaAtualizarPaciente.naturalidade_municipio} onChange={handlePacienteChange}/>
               </div>

               <hr/>

               <span className="subtitulo h5 text-success">Dados pessoais</span>
               <div className="grid grid_5">
                  <TextField disabled={!modoEdicao} name="responsavel_legal" label="Responsável Legal" variant="outlined" value={dadosParaAtualizarPaciente.responsavel_legal ? dadosParaAtualizarPaciente.responsavel_legal : "Não aplicável"} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="profissao" label="Profissão" variant="outlined" value={dadosParaAtualizarPaciente.profissao ? dadosParaAtualizarPaciente.profissao : "Desempregado"} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="estado_clinico" label="Estado Clínico" variant="outlined" value={dadosParaAtualizarPaciente.estado_clinico} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="estado_civil" label="Estado Cívil" variant="outlined"  value={dadosParaAtualizarPaciente.estado_civil} onChange={handlePacienteChange}/>
               </div>

               <hr/>

               <span className="subtitulo h5 text-success">Alfabetização</span>
               <div className="grid grid_5">
                  <TextField disabled={!modoEdicao} name="leitura" label="Saber ler" variant="outlined" value={dadosParaAtualizarPaciente.leitura = true ? 'Sim' : 'Não'} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="escrita" label="Saber Escrever" variant="outlined" value={dadosParaAtualizarPaciente.escrita = true ? 'Sim' : 'Não'} onChange={handlePacienteChange}/>
               </div>

               <hr/>

               <span className="subtitulo h5 text-success">Contatos</span>
               <div className="grid grid_2">
                  <TextField disabled={!modoEdicao} name="email" label="E-mail" variant="outlined" value={dadosParaAtualizarPaciente.email} onChange={handlePacienteChange}/>
                  <PatternFormat disabled={!modoEdicao} name="telefone" label="Telefone" variant="outlined" value={dadosParaAtualizarPaciente.telefone} format={(dadosParaAtualizarPaciente.telefone || "").replace(/\D/g, '').length > 10 ? "(##) # ####-####" : "(##) ####-####"} mask=" " customInput={TextField}/>
               </div>

               <div className="grid grid_4">
                  <TextField disabled={!modoEdicao} name="escolaridade" label="Escolaridade" variant="outlined" value={dadosParaAtualizarPaciente.escolaridade} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="nome_instituicao" label="Nome da Instituição" variant="outlined" value={dadosParaAtualizarPaciente.nome_instituicao} onChange={handlePacienteChange}/>
                  <TextField disabled={!modoEdicao} name="tipo_instituicao" label="Tipo de Instituição" variant="outlined" value={dadosParaAtualizarPaciente.tipo_instituicao} onChange={handlePacienteChange}/>
               </div>
               
               <hr/>

               <span className="subtitulo h5 text-success">Dados do Endereço</span>
               <div className="grid grid_4">
                  <TextField disabled={!modoEdicao} name="bairro" label="Bairro" variant="outlined" value={dadosParaAtualizarEndereco.bairro} onChange={handleEnderecoChange}/>
                  <TextField disabled={!modoEdicao} name="cidade" label="Cidade" variant="outlined" value={dadosParaAtualizarEndereco.cidade} onChange={handleEnderecoChange}/>
                  <TextField disabled={!modoEdicao} name="estado" label="Estado" variant="outlined" value={dadosParaAtualizarEndereco.estado} onChange={handleEnderecoChange}/>
               </div>
               
               <div className="grid grid_2">
                  <TextField disabled={!modoEdicao} name="logradouro" label="Logradouro" variant="outlined"  value={dadosParaAtualizarEndereco.logradouro} onChange={handleEnderecoChange}/>
                  <PatternFormat disabled={!modoEdicao} name="numero" label="Número" value={dadosParaAtualizarEndereco.numero} format={(dadosParaAtualizarEndereco.numero || "").replace(/\D/g, '').length > 3 ? "#.###" : "###"} mask=" " customInput={TextField} variant="outlined" onChange={handleEnderecoChange}/>
                  <TextField disabled={!modoEdicao} name="complemento" label="Complemento" variant="outlined" value={dadosParaAtualizarEndereco.complemento} onChange={handleEnderecoChange}/>
                  <PatternFormat disabled={!modoEdicao} name="cep" label="CEP" variant="outlined" format="#####-###" mask=" " customInput={TextField} value={dadosParaAtualizarEndereco.cep} onChange={handleEnderecoChange}/>
                  <TextField disabled={!modoEdicao} name="ponto_referencia" label="Ponto de Referência" variant="outlined" value={dadosParaAtualizarEndereco.ponto_referencia ? dadosParaAtualizarEndereco.ponto_referencia : "Não possui/Não informado"} onChange={handleEnderecoChange}/>
                  <TextField disabled={!modoEdicao} name="pais" label="Pais" variant="outlined"  value={dadosParaAtualizarEndereco.pais} onChange={handleEnderecoChange}/>
               </div>

               <hr/>

               <span className="subtitulo h5 text-success">Dados da Residencia</span>
               <div className="grid grid_4">
                  <TextField disabled={!modoEdicao} name="nome_animal" label="Possui animais" variant="outlined" value={dadosParaAtualizarEndereco?.tipo_animal ? "Possui" : "Não possui"} onChange={handleEnderecoChange}/>
                  <TextField disabled={!modoEdicao} name="nome_imovel" label="Tipo de Imóvel" variant="outlined" value={dadosParaAtualizarEndereco?.tipo_imovel?.nome_imovel} onChange={handleEnderecoChange}/>
                  <TextField disabled={!modoEdicao} name="nome_material" label="Material do Imóvel" variant="outlined" value={dadosParaAtualizarEndereco?.material_predominante?.nome_material} onChange={handleEnderecoChange}/>
               </div>

               <hr/>

               <div className="form-buttons">
                  <Button variant="outline-success" onClick={onClose}>Voltar pra tela inicial</Button>
                  <div style={{display: "flex", gap: "20px"}}>
                     {modoEdicao ? <Button variant="outline-danger" onClick={handleCancelar}>Cancelar</Button> : ""}
                     <Button variant="outline-success" onClick={() => {modoEdicao === true ? (atualizarDados(), setModoEdicao(false)) : setModoEdicao(!modoEdicao)}}>{modoEdicao === false ? "Alterar Cadastro" : "Salvar alterações"}</Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}