import "./Modal_DetalhesRegistro.css";
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material'
import { PatternFormat } from "react-number-format";

import { GoX } from "react-icons/go";

export default function Modal_DetalhesRegistro({onClose, registroId}) {
   const [dadosRegistro, setDadosRegistro] = useState({
      id: '',
      data_visita: '',
      registro_visita: '',
      motivo: '',
      desfecho: '',
      descricao: '',
      agenteId: '',
      pacienteId: '',
      enderecoId: ''
   });
   
   const [dadosPaciente, setDadosPaciente] = useState({
      id: '',
      cpf: '',
      nome: '',
      sus: ''
   });
   
   const [dadosEndereco, setDadosEndereco] = useState({
      enderecoId: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: ''
   });
   
   const [dadosAgente, setDadosAgente] = useState({
      id: '',
      nome_agente: '',
      cns: '',
      posto: {
         nome_posto: ''
      }
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
            const response = await api.get(`/registro/${registroId}`)
            setDadosRegistro(response.data);
            setDadosAgente(response.data.agente);
            setDadosPaciente(response.data.paciente);
            setDadosEndereco(response.data.endereco);
            // console.log("Busca pelo registro: ", response.data);
         }
         catch (err) {
            console.log(err);
         }
      }
      buscarRegistro();
   }, []);
   
      
   return (
      <div className="modal-overlay">
         <div className="content-modal_detalhesRegistro">
            <div className="titulo">
               <span className="h3">Detalhes sobre o registro</span>
               <div className="fechar" onClick={onClose}>
                  <GoX color="var(--bs-success-rgb)"/>
               </div>
            </div>

            <div className="elements-modal_detalhesRegistro">
               <span className="subtitulo h5 text-success">Dados do Paciente</span>
               <div className="grid grid_1">
                  <TextField name="nome" label="Nome do Paciente" variant="outlined" value={dadosPaciente.nome} onChange={(e) => handleFormChange(e)}/>
                  <PatternFormat name="cep" label="CPF do Paciente" variant="outlined" format="###.###.###-##" mask=" " customInput={TextField} value={dadosPaciente.cpf} onChange={(e) => handleFormChange(e)}/>
                  <PatternFormat name="sus" label="Nº SUS" variant="outlined" format="### #### #### ###" mask=" " customInput={TextField} value={dadosPaciente.sus} onChange={(e) => handleFormChange(e)}/>
               </div>
               
               <hr/>
               <span className="subtitulo h5 text-success">Endereço</span>

               <div className="grid grid_2">
                  <TextField name="logradouro" label="Logradouro" variant="outlined"  value={dadosEndereco.logradouro} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="numero" label="Número" type="number" variant="outlined" value={dadosEndereco.numero} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="complemento" label="Complemento" variant="outlined" value={dadosEndereco.complemento} onChange={(e) => handleFormChange(e)}/>
                  <PatternFormat name="cep" label="CEP" variant="outlined" format="#####-###" mask=" " customInput={TextField} value={dadosEndereco.cep} onChange={(e) => handleFormChange(e)}/>
               </div>
               
               <div className="grid grid_3">
                  <TextField name="bairro" label="Bairro" variant="outlined" value={dadosEndereco.bairro} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="cidade" label="Cidade" variant="outlined" value={dadosEndereco.cidade} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="estado" label="UF" variant="outlined" value={dadosEndereco.estado} onChange={(e) => handleFormChange(e)}/>
               </div>

               <hr/>
               <span className="subtitulo h5 text-success">Dados do Agente</span>

               <div className="grid grid_2">
                  <TextField name="nome_agente" label="Agente de Saúde" variant="outlined" value={dadosAgente.nome_agente} onChange={(e) => handleFormChange(e)} />
                  <TextField name="nome_posto" label="UBS" variant="outlined" value={dadosAgente.posto.nome_posto} onChange={(e) => handleFormChange(e)}/>
               </div>

               <hr/>
               <span className="subtitulo h5 text-success">Sobre a visita</span>

               <div className="grid grid_4">
                  <TextField name="motivo" label="Motivo" variant="outlined" value={dadosRegistro.motivo} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="desfecho" label="Desfecho" variant="outlined" value={dadosRegistro.desfecho} onChange={(e) => handleFormChange(e)}/>
                  <TextField name="data_visita" label="Data/Hora" variant="outlined" value={new Date(dadosRegistro.data_visita).toLocaleString('pt-BR')} onChange={(e) => handleFormChange(e)}/>
               </div>

               <div className="grid">
                  <TextField name="descricao" label="Descrição" variant="outlined" multiline rows={3} value={dadosRegistro.descricao} onChange={(e) => handleFormChange(e)}/>
               </div>

               <div className="button-modal_novoRegistro">
                  <Button variant="outline-success" onClick={onClose}>Fechar</Button>
               </div>
            </div>
         </div>
      </div>
   )
}