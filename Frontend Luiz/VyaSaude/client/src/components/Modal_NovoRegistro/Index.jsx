import "./Modal_NovoRegistro.css";
import api from '../../services/api';
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getUser } from "../../helpers/auth";
import SVG_Close from '../../../public/close.svg'

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
      num_telefone: '',
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
               num_telefone: buscarPaciente.data.num_telefone,
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
         <div className="Modal_NovoRegistro-content">
            <div className="titulo">
               <span className="h3">Novo registro de visita domiciliar</span>
               <div className="fechar" onClick={onClose}> {/* TROCAR PRA ICONE SVG*/}
                  <img src={SVG_Close} width={20} height={20} ></img>
               </div>
            </div>

            <div className="Modal_NovoRegistro-elements">
               <form id="modal_novoRegistro" onSubmit={handleRegister}>
                  <span className="h5 text-success">Dados do Paciente</span>
                  <div className="grid grid_1">
                     <TextField variant="outlined" name="nome" value={dadosPaciente.nome} onChange={(e) => handleFormChange(e)} label="Nome do Paciente"></TextField>
                     <TextField variant="outlined" name="cpf" required error={cpfErro} helperText={cpfValidacao} value={novoRegistro.cpf} onChange={(e) => handleFormChange(e)} type="text" label="CPF do Paciente"></TextField>
                     <TextField variant="outlined" name="sus" value={dadosPaciente.sus} onChange={(e) => handleFormChange(e)} label="Nº SUS" type="number"></TextField>
                     <TextField variant="outlined" name="data_nascimento" value={dadosPaciente.data_nascimento} InputLabelProps={{ shrink: true }} onChange={(e) => handleFormChange(e)} label="Data de Nascimento" type="date"></TextField> {/* InputLabelProps: Remove placeholder quando a data for vazia. */}
                     <TextField variant="outlined" name="num_telefone" value={dadosPaciente.num_telefone} onChange={(e) => handleFormChange(e)} label="Telefone" type="number"></TextField>
                     <TextField variant="outlined" name="email" value={dadosPaciente.email} onChange={(e) => handleFormChange(e)} label="Email" type="email"></TextField>
                  </div>
                  
                  <hr/>
                  <span className="h5 text-success">Endereço</span>

                  <div className="grid grid_2">
                     <TextField variant="outlined" name="logradouro" value={dadosPaciente.logradouro} onChange={(e) => handleFormChange(e)} label="Logradouro"></TextField>
                     <TextField variant="outlined" name="numero" value={dadosPaciente.numero} onChange={(e) => handleFormChange(e)} label="Número" type="number"></TextField>
                     <TextField variant="outlined" name="complemento" value={dadosPaciente.complemento} onChange={(e) => handleFormChange(e)} label="Complemento"></TextField>
                     <TextField variant="outlined" name="cep" value={dadosPaciente.cep} onChange={(e) => handleFormChange(e)} label="CEP" type="number"></TextField>
                  </div>
                  
                  <div className="grid grid_3">
                     <TextField variant="outlined" name="bairro" value={dadosPaciente.bairro} onChange={(e) => handleFormChange(e)} label="Bairro"></TextField>
                     <TextField variant="outlined" name="cidade" value={dadosPaciente.cidade} onChange={(e) => handleFormChange(e)} label="Cidade"></TextField>
                     <TextField variant="outlined" name="estado" value={dadosPaciente.estado} onChange={(e) => handleFormChange(e)} label="UF"></TextField>
                  </div>

                  <hr/>
                  <span className="h5 text-success">Dados do Agente</span>

                  <div className="grid grid_2">
                     <TextField variant="outlined" name="nome_agente" value={dadosAgente.nome_agente} onChange={(e) => handleFormChange(e)} label="Agente de Saúde"></TextField>
                     <TextField variant="outlined" disabled name="cns" value={dadosAgente.cns} onChange={(e) => handleFormChange(e)} label="CNS" type="number"></TextField>
                     <TextField variant="outlined" name="ubs_nome" value={dadosAgente.ubs_nome} onChange={(e) => handleFormChange(e)} label="Unidade Básica de Saúde"></TextField>
                     <TextField variant="outlined" name="ubs_codigo" value={dadosAgente.ubs_codigo} onChange={(e) => handleFormChange(e)} label="Código da Unidade" type="number"></TextField>
                  </div>

                  <div className="grid grid_4">
                     <TextField variant="outlined" name="ubs_email" value={dadosAgente.ubs_email} onChange={(e) => handleFormChange(e)} label="Email da UBS" type="email"></TextField>
                     <TextField variant="outlined" name="ubs_telefone" value={dadosAgente.ubs_telefone} onChange={(e) => handleFormChange(e)} label="Telefone da UBS" type="number"></TextField>
                  </div>

                  <hr/>
                  <span className="h5 text-success">Sobre a visita</span>

                  <div className="grid grid_4">
                     <FormControl variant="outlined" required>
                        <InputLabel id="selectMotivo">Motivo</InputLabel>
                        <Select className="select-Modal_NovoRegistro" variant="outlined" name="motivo" value={novoRegistro.motivo} onChange={(e) => handleFormChange(e)} labelId="selectMotivo" >
                           <MenuItem value="Cadastramento/Atualização">Cadastramento/Atualização</MenuItem>
                           <MenuItem value="Visita Periódica">Visita Periódica</MenuItem>
                        </Select>
                     </FormControl>

                     <FormControl variant="outlined" required>
                        <InputLabel id="selectDesfecho">Desfecho</InputLabel>
                        <Select className="select-Modal_NovoRegistro" variant="outlined" name="desfecho" value={novoRegistro.desfecho} onChange={(e) => handleFormChange(e)} labelId="selectDesfecho" >
                           <MenuItem value="Visita realizada">Visita realizada</MenuItem>
                           <MenuItem value="Visita recusada">Visita recusada</MenuItem>
                           <MenuItem value="Ausente">Ausente</MenuItem>
                        </Select>
                     </FormControl>
                  </div>

                  <div className="grid">
                     <TextField variant="outlined" name="descricao" required multiline rows={3} value={novoRegistro.descricao} onChange={(e) => handleFormChange(e)} label="Descrição"></TextField>
                  </div>

                  <div className="modal_buttons">
                     <Button variant="outline-success" onClick={onClose}>Cancelar</Button>
                     <Button variant="success" form="modal_novoRegistro" type="submit">Cadastrar</Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}