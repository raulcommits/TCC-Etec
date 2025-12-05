import "./Modal_NovoRegistro.css";
import api from '../../services/api';
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { PatternFormat } from 'react-number-format';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getUser } from "../../helpers/auth";

import { GoX } from "react-icons/go";

export default function Modal_NovoRegistro({onClose, onSuccess}) {
   const usuarioLogado = getUser();

   const [cpfErro, setCpfErro] = useState(false);
   const [cpfValidacao, setCpfValidacao] = useState('');

   const [novoRegistro, setNovoRegistro] = useState({
      agenteId: '',  // FK
      pacienteId: '',  // FK
      enderecoId: '',  // FK
      data_visita: '',
      motivo: '',
      desfecho: '',
      descricao: '',
      cpf: ''
   });

   const [dadosPaciente, setDadosPaciente] = useState({
      id: '',
      cpf: '', // Relacionamento
      nome: '',
      sus: '',
      data_nascimento: '',
      telefone: '',
      email: '',
      
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
      ubs_nome: '',
      ubs_codigo: '',
      ubs_email: '',
      ubs_telefone: ''
   });

   useEffect(() => {
      if (novoRegistro.cpf && novoRegistro.cpf.length === 11) {
         buscarDados();
      }
   }, [novoRegistro.cpf]);

   async function buscarDados() { // Obtenção dos dados do Paciente e do Agente logado.
      try {
         const buscarPaciente = await api.get(`/paciente/${novoRegistro.cpf}`);
         console.log("Busca do Paciente: ");
         console.log(buscarPaciente.data);

         if (buscarPaciente.data) {
            setDadosPaciente(({
               pacienteId: buscarPaciente.data.id,
               cpf: buscarPaciente.data.cpf,
               nome: buscarPaciente.data.nome,
               sus: buscarPaciente.data.sus,
               data_nascimento: buscarPaciente.data.data_nascimento,
               telefone: buscarPaciente.data.telefone,
               email: buscarPaciente.data.email,
               
               enderecoId: buscarPaciente.data.endereco.id,
               logradouro: buscarPaciente.data.endereco.logradouro,
               numero: buscarPaciente.data.endereco.numero,
               complemento: buscarPaciente.data.endereco.complemento,
               cep: buscarPaciente.data.endereco.cep,
               bairro: buscarPaciente.data.endereco.bairro,
               cidade: buscarPaciente.data.endereco.cidade,
               estado: buscarPaciente.data.endereco.estado
            }));
            
            const buscarAgente = await api.get(`/agente/${usuarioLogado.cpf}`);
            console.log("Busca do Agente: ");
            console.log(buscarAgente.data);

            setDadosAgente(({
               agenteId: buscarAgente.data.id,
               nome_agente: buscarAgente.data.nome_agente,
               cns: "",// Discutir com o grupo sobre o "código do agente"
               ubs_nome: buscarAgente.data.posto.nome_posto,
               ubs_codigo: buscarAgente.data.posto.id,
               ubs_email: buscarAgente.data.posto.email,
               ubs_telefone: buscarAgente.data.posto.telefone
            }));

            setCpfErro(false);
            setCpfValidacao('');
         } else {
            setCpfErro(true);
         }
      } catch(err) {
         console.log(err);
         setCpfErro(true);
         setCpfValidacao("CPF não encontrado ou inválido.");
      }
   };


   useEffect(() => { // Garante que o formulário tenha os IDs de paciente e agente vinculados antes de fazer o registro do formulário.
      if (dadosPaciente.pacienteId && dadosAgente.agenteId) {
         setNovoRegistro((dados) => ({
            ...dados,
            pacienteId: dadosPaciente.pacienteId,
            enderecoId: dadosPaciente.enderecoId,
            agenteId: dadosAgente.agenteId
         }));
      }
   }, [dadosPaciente, dadosAgente]);


   const handleFormChange = (e) => { // Captura alterações nos inputs, e insere os valores no array de novoRegistro.
      const {name, value} = e.target;
      
      setNovoRegistro((dados) => ({
         ...dados,
         [name]: value
      }));
   };


   async function handleRegister(e) { // Cadastro da Visita.
      e.preventDefault();
      
      // Etapa de realização do cadastro da Visita.
      try {
         const registroPayload = {...novoRegistro, registro_visita: 1234567890, data_visita: '2025-07-30 00:00:00'};
         console.log(registroPayload);
         await api.post('/registro/cadastro', registroPayload);
         onSuccess(); // salva o registro, fecha o modal, e atualiza a lista na tela de visitas.
      } catch(err) {
         console.log(err.response);
      }
   }

   return (
      <div className="modal-overlay">
         <div className="content-modal_novoRegistro">
            <div className="titulo">
               <span className="h3">Novo registro de visita domiciliar</span>
               <div className="fechar" onClick={onClose}>
                  <GoX color="var(--bs-success-rgb)"/>
               </div>
            </div>

            <div className="elements-modal_novoRegistro">
               <form id="form-modal_novoRegistro" onSubmit={handleRegister}>
                  <span className="subtitulo h5 text-success">Dados do Paciente</span>
                  <div className="grid grid_2">
                     <TextField name="nome" label="Nome do Paciente" value={dadosPaciente.nome} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                     <TextField name="data_nascimento" label="Data de Nascimento" value={dadosPaciente.data_nascimento} InputLabelProps={{ shrink: true }} type="date" variant="outlined" onChange={(e) => handleFormChange(e)}/> {/* InputLabelProps: Remove placeholder quando a data for vazia. */}
                  </div>
                  <div className="grid grid_2">
                     <PatternFormat name="cpf" label="CPF do Paciente" value={novoRegistro.cpf} required error={cpfErro} helperText={cpfValidacao} format="###.###.###-##" mask=" " customInput={TextField} variant="outlined" onValueChange={(values) => {setNovoRegistro(prev => ({ ...prev, cpf: values.value }) )} }/>
                     <PatternFormat name="sus" label="Nº SUS" value={dadosPaciente.sus} format="### #### #### ####" mask=" " customInput={TextField} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                  </div>
                  <div className="grid grid_2">
                     <PatternFormat name="telefone" label="Telefone" value={dadosPaciente.telefone} format={(dadosPaciente.telefone || "").replace(/\D/g, '').length > 10 ? "(##) # ####-####" : "(##) ####-####"} mask=" " customInput={TextField} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                     <TextField name="email" label="Email" value={dadosPaciente.email} type="email" variant="outlined" onChange={(e) => handleFormChange(e)}/>
                  </div>
                  
                  <hr/>
                  <span className="subtitulo h5 text-success">Endereço</span>

                  <div className="grid grid_2">
                     <TextField name="logradouro" value={dadosPaciente.logradouro} variant="outlined" onChange={(e) => handleFormChange(e)} label="Logradouro"/>
                     <PatternFormat name="numero" label="Número" value={dadosPaciente.numero} format={(dadosPaciente.numero || "").replace(/\D/g, '').length > 3 ? "#.###" : "###"} mask=" " customInput={TextField} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                     <TextField name="complemento" value={dadosPaciente.complemento} variant="outlined" onChange={(e) => handleFormChange(e)} label="Complemento"/>
                     <PatternFormat name="cep" label="CEP" value={dadosPaciente.cep} variant="outlined" format="#####-###" mask=" " customInput={TextField}  onChange={(e) => handleFormChange(e)}/>
                  </div>
                  
                  <div className="grid grid_3">
                     <TextField name="bairro" value={dadosPaciente.bairro} variant="outlined" onChange={(e) => handleFormChange(e)} label="Bairro"/>
                     <TextField name="cidade" value={dadosPaciente.cidade} variant="outlined" onChange={(e) => handleFormChange(e)} label="Cidade"/>
                     <TextField name="estado" value={dadosPaciente.estado} variant="outlined" onChange={(e) => handleFormChange(e)} label="UF"/>
                  </div>

                  <hr/>
                  <span className="subtitulo h5 text-success">Dados do Agente</span>

                  <div className="grid grid_2">
                     <TextField name="nome_agente" value={dadosAgente.nome_agente} variant="outlined" onChange={(e) => handleFormChange(e)} label="Agente de Saúde"/>
                     <TextField name="ubs_nome" value={dadosAgente.ubs_nome} variant="outlined" onChange={(e) => handleFormChange(e)} label="Unidade Básica de Saúde"/>
                  </div>

                  <div className="grid grid_4">
                     <TextField name="ubs_email" label="Email da UBS" value={dadosAgente.ubs_email} variant="outlined" onChange={(e) => handleFormChange(e)} type="email"/>
                     <PatternFormat name="ubs_telefone" label="Telefone da UBS" value={dadosAgente.ubs_telefone} variant="outlined" format={(dadosAgente.ubs_telefone || "").replace(/\D/g, '').length > 10 ? "(##) # ####-####" : "(##) ####-####"} mask=" " customInput={TextField} onChange={(e) => handleFormChange(e)}/>
                  </div>

                  <hr/>
                  <span className="subtitulo h5 text-success">Sobre a visita</span>

                  <div className="grid grid_4">
                     <FormControl variant="outlined" required>
                        <InputLabel id="selectMotivo">Motivo</InputLabel>
                        <Select className="select-modal_novoRegistro" name="motivo" value={novoRegistro.motivo} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectMotivo" >
                           <MenuItem value="Cadastramento/Atualização">Cadastramento/Atualização</MenuItem>
                           <MenuItem value="Visita Periódica">Visita Periódica</MenuItem>
                        </Select>
                     </FormControl>

                     <FormControl variant="outlined" required>
                        <InputLabel id="selectDesfecho">Desfecho</InputLabel>
                        <Select className="select-modal_novoRegistro" name="desfecho" value={novoRegistro.desfecho} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectDesfecho" >
                           <MenuItem value="Visita realizada">Visita realizada</MenuItem>
                           <MenuItem value="Visita recusada">Visita recusada</MenuItem>
                           <MenuItem value="Ausente">Ausente</MenuItem>
                        </Select>
                     </FormControl>
                  </div>

                  <div className="grid">
                     <TextField name="descricao" required multiline rows={3} value={novoRegistro.descricao} variant="outlined" onChange={(e) => handleFormChange(e)} label="Descrição"/>
                  </div>

                  <div className="button-modal_novoRegistro">
                     <Button variant="outline-success" onClick={onClose}>Cancelar</Button>
                     <Button variant="success" form="form-modal_novoRegistro" type="submit">Cadastrar</Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}