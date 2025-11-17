import "./Modal_DetalhesRegistro.css";
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material'
import SVG_Close from '../../../public/close.svg'

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
         <div className="Modal_DetalhesRegistro-content">
            <div className="titulo">
               <span className="h3">Detalhes sobre o registro</span>
               <div className="fechar" onClick={onClose}> {/* TROCAR PRA ICONE SVG*/}
                  <img src={SVG_Close} width={20} height={20} ></img>
               </div>
            </div>

            <div className="Modal_DetalhesRegistro-elements">
               <div id="modal_detalhesRegistro">
                  <span className="d-flex h5 text-success">Dados do Paciente</span>
                  <div className="grid grid_1">
                     <TextField variant="outlined" name="nome" value={dadosPaciente.nome} onChange={(e) => handleFormChange(e)} label="Nome do Paciente"></TextField>
                     <TextField variant="outlined" name="cpf"  value={dadosPaciente.cpf} onChange={(e) => handleFormChange(e)} type="text" label="CPF do Paciente"></TextField>
                     <TextField variant="outlined" name="sus"  value={dadosPaciente.sus} onChange={(e) => handleFormChange(e)} label="Nº SUS" type="number"></TextField>
                  </div>
                  
                  <hr/>
                  <span className="d-flex h5 text-success">Endereço</span>

                  <div className="grid grid_2">
                     <TextField variant="outlined" name="logradouro"    value={dadosEndereco.logradouro} onChange={(e) => handleFormChange(e)} label="Logradouro"></TextField>
                     <TextField variant="outlined" name="numero"        value={dadosEndereco.numero} onChange={(e) => handleFormChange(e)} label="Número" type="number"></TextField>
                     <TextField variant="outlined" name="complemento"   value={dadosEndereco.complemento} onChange={(e) => handleFormChange(e)} label="Complemento"></TextField>
                     <TextField variant="outlined" name="cep"           value={dadosEndereco.cep} onChange={(e) => handleFormChange(e)} label="CEP" type="number"></TextField>
                  </div>
                  
                  <div className="grid grid_3">
                     <TextField variant="outlined" name="bairro" value={dadosEndereco.bairro} onChange={(e) => handleFormChange(e)} label="Bairro"></TextField>
                     <TextField variant="outlined" name="cidade" value={dadosEndereco.cidade} onChange={(e) => handleFormChange(e)} label="Cidade"></TextField>
                     <TextField variant="outlined" name="estado" value={dadosEndereco.estado} onChange={(e) => handleFormChange(e)} label="UF"></TextField>
                  </div>

                  <hr/>
                  <span className="d-flex h5 text-success">Dados do Agente</span>

                  <div className="grid grid_4">
                     <TextField variant="outlined" name="nome_agente"   value={dadosAgente.nome_agente} onChange={(e) => handleFormChange(e)} label="Agente de Saúde"></TextField>
                     <TextField variant="outlined" disabled name="cns"  value={dadosAgente.cns} onChange={(e) => handleFormChange(e)} label="CNS" type="number"></TextField>
                     <TextField variant="outlined" name="nome_posto"    value={dadosAgente.posto.nome_posto} onChange={(e) => handleFormChange(e)} label="UBS"></TextField>
                  </div>

                  <hr/>
                  <span className="d-flex h5 text-success">Sobre a visita</span>

                  <div className="grid grid_4">
                     <TextField variant="outlined" name="motivo"        value={dadosRegistro.motivo} onChange={(e) => handleFormChange(e)} label="Motivo"></TextField>
                     <TextField variant="outlined" name="desfecho"      value={dadosRegistro.desfecho} onChange={(e) => handleFormChange(e)} label="Desfecho"></TextField>
                     <TextField variant="outlined" name="data_visita"   value={new Date(dadosRegistro.data_visita).toLocaleString('pt-BR')} onChange={(e) => handleFormChange(e)} label="Data/Hora"></TextField>
                  </div>

                  <div className="grid">
                     <TextField variant="outlined" name="descricao" multiline rows={3} value={dadosRegistro.descricao} onChange={(e) => handleFormChange(e)} label="Descrição"></TextField>
                  </div>

                  <div className="modal_buttons">
                     <Button variant="outline-success" onClick={onClose}>Fechar</Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}