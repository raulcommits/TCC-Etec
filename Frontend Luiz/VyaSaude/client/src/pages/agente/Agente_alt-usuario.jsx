import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import api from '../../services/api';
import cboData from './../../data/cbo2002_KeyedJson.json';
import { useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { PatternFormat } from "react-number-format";
import { TextField, InputAdornment, IconButton } from "@mui/material";


import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import AddUserMale from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';

import { GoReply } from "react-icons/go";
import { MdContentPasteSearch } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Search, Clear } from "@mui/icons-material";


function Agente_altUsuario() {
   const navigate = useNavigate();

   const [exibirModal_editarPaciente, setEditarRegistro] = useState(false); // Abertura e fechamento do Modal de Novo Registro
   const [exibirModal_detalhesPaciente, setDetalhesRegistro] = useState(false); // Abertura e fechamento do Modal de Novo Registro

   const [recarregar, setRecarregar] = useState(false);
   const [pacientes, setPacientes] = useState([]);
   const [pacienteId, setPacienteId] = useState(undefined);

   const [busca, setBusca] = useState("");
   const [dataFiltro, setDataFiltro] = useState("");

   useEffect(() => {
      async function buscarPacientes() {
         try {
            const resposta = await api.get('/paciente');
            setPacientes(resposta.data.response)
            console.log("Pacientes: ", resposta.data);
         } catch(err) {
            console.log(err);
         }
      };

      buscarPacientes();
   }, [recarregar]);

   
   const pacientesFiltrados = Array.isArray(pacientes) ? pacientes.filter((row) => {
      // Normaliza os textos para minúsculo para facilitar a busca
      const termo = busca.toLowerCase();
      if (!termo) return true
      
      console.log(pacientesFiltrados)
      console.log("foi")
      const nomePaciente = row.nome?.toLowerCase() || "";
      const cpfPaciente = row.cpf || "";
      const numSusPaciente = row.sus?.toLowerCase() || "";
      const dataRow = row.data_nascimento ? row.data_nascimento.split('T')[0] : "";
      const num_telefone = row.num_telefone?.toLowerCase() || "";
      const email = row.email?.toLowerCase() || "";
      const escolaridade = row.escolaridade?.toLowerCase() || "";
      const nome_instituicao = row.nome_instituicao?.toLowerCase() || "";
      const tipo_instituicao = row.tipo_instituicao?.toLowerCase() || "";
      const estado_clinico = row.estado_clinico?.toLowerCase() || "";

      // Verifica Texto (Nome, CPF ou Agente)
      return (
         nomePaciente.includes(termo) || cpfPaciente.includes(termo) || numSusPaciente.includes(termo) ||  
               num_telefone.includes(termo) || email.includes(termo) || escolaridade.includes(termo) || nome_instituicao.includes(termo) || 
               tipo_instituicao.includes(termo) || estado_clinico.includes(termo)
      );
   }) : [];

   // --- ESTADOS DA ORDENAÇÃO ---
   const [ordemCol, setOrdemCol] = useState(null); // Qual coluna? ex: 'nome'
   const [ordemDirecao, setOrdemDirecao] = useState('asc'); // 'asc' ou 'desc'

   // --- FUNÇÃO PARA MANIPULAR O CLIQUE NO CABEÇALHO ---
   const handleOrdenar = (coluna) => {
      const isAsc = ordemCol === coluna && ordemDirecao === 'asc';
      setOrdemDirecao(isAsc ? 'desc' : 'asc');
      setOrdemCol(coluna);
   };


   // --- LÓGICA DE ORDENAÇÃO DOS DADOS JÁ FILTRADOS ---
   const pacientesOrdenados = [...pacientesFiltrados].sort((a, b) => {
      if (!ordemCol) return 0;

      // Função auxiliar para pegar valores aninhados (ex: paciente.nome)
      const getValor = (obj, caminho) => {
         return caminho.split('.').reduce((o, i) => (o ? o[i] : null), obj);
      };

      const valorA = getValor(a, ordemCol);
      const valorB = getValor(b, ordemCol);

      // Tratamento para nulos/undefined
      if (valorA === valorB) return 0;
      if (valorA === null || valorA === undefined) return 1;
      if (valorB === null || valorB === undefined) return -1;

      // Comparação
      let comparacao = 0;
      if (typeof valorA === 'string') {
         comparacao = valorA.localeCompare(valorB); // Ordenação alfabética correta
      } else {
         comparacao = valorA < valorB ? -1 : 1; // Números ou Datas
      }

      return ordemDirecao === 'asc' ? comparacao : -comparacao;
   });
   
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '/Agente_home' }, {label: 'Cadastro', href: '/Agente_home-usuario'}, {label: 'Alterar cadastro de paciente', href: '/Agente_alt-usuario'}]} />
         <NavBar items={[
            { label: 'Home', href: '/agente_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Agente_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Agente_hist-visitas', icon: query },
            { label: 'Dash', href: '/Agente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-pages">
            <div className="content-pages-agente">
               <div className="content-agente_altUsuario">
                  <div className="title-pages">
                     <GoReply onClick={() => navigate(-1)}/>
                     <h1 className="align-self-center h2 px-5">Alterar informações de paciente</h1>
                  </div>

                  <div className="cabecalho">
                     <div className="filtragem">
                        <h4 className="h4 text-success">Filtrar por</h4>
                        <div className="filtros">
                           {/* Campo de Busca (Texto) */}
                           <TextField
                              // label="Buscar Paciente, CPF ou Agente"
                              variant="outlined"
                              size="small"
                              value={busca}
                              placeholder="Buscar paciente pelo nome, CPF, SUS, telefone ou email"
                              onChange={(e) => setBusca(e.target.value)}
                              InputProps={{
                                 startAdornment: (
                                    <InputAdornment position="start">
                                       <Search color="action" />
                                    </InputAdornment>
                                 ),
                                 endAdornment: busca && (
                                    <InputAdornment position="end">
                                       <IconButton size="small" onClick={() => setBusca("")}>
                                          <Clear fontSize="small" />
                                       </IconButton>
                                    </InputAdornment>
                                 )
                              }}
                           />

                           {/* Campo de filtro pela Data de Nascimento */}
                           <TextField
                              label="Data de nascimento"
                              type="date"
                              variant="outlined"
                              size="small"
                              value={dataFiltro}
                              onChange={(e) => setDataFiltro(e.target.value)}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                        </div>
                     </div>
                  </div>

                  <br></br>

                  <table className="table table-hover table-agente_histVisitas">
                     <thead>
                        <tr>
                           <th onClick={() => handleOrdenar('nome')} style={{ cursor: 'pointer' }}>
                              Nome {ordemCol === 'nome' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           {/* Exemplo: Coluna Aninhada (paciente.nome) */}
                           <th onClick={() => handleOrdenar('cpf')} style={{ cursor: 'pointer' }}>
                              CPF {ordemCol === 'cpf' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('sus')} style={{ cursor: 'pointer' }}>
                              SUS {ordemCol === 'sus' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('data_nascimento')} style={{ cursor: 'pointer' }}>
                              Data de Nascimento {ordemCol === 'data_nascimento' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('genero')} style={{ cursor: 'pointer' }}>
                              Gênero {ordemCol === 'genero' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('etnia')} style={{ cursor: 'pointer' }}>
                              Etnia {ordemCol === 'etnia' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('estado_civil')} style={{ cursor: 'pointer' }}>
                              Estado Civil {ordemCol === 'estado_civil' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('nacionalidade')} style={{ cursor: 'pointer' }}>
                              Nacionalidade {ordemCol === 'nacionalidade' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('naturalidade_estado')} style={{ cursor: 'pointer' }}>
                              Naturalidade (Estado) {ordemCol === 'naturalidade_estado' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('naturalidade_municipio')} style={{ cursor: 'pointer' }}>
                              Naturalidade (Municipio) {ordemCol === 'naturalidade_municipio' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('num_telefone')} style={{ cursor: 'pointer' }}>
                              Telefone {ordemCol === 'num_telefone' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('email')} style={{ cursor: 'pointer' }}>
                              Email {ordemCol === 'email' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('escolaridade')} style={{ cursor: 'pointer' }}>
                              Escolaridade {ordemCol === 'escolaridade' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('nome_instituicao')} style={{ cursor: 'pointer' }}>
                              Nome da instituição {ordemCol === 'nome_instituicao' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('tipo_instituicao')} style={{ cursor: 'pointer' }}>
                              Tipo de Instituição {ordemCol === 'tipo_instituicao' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('estado_clinico')} style={{ cursor: 'pointer' }}>
                              Estado Clínico {ordemCol === 'estado_clinico' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('leitura')} style={{ cursor: 'pointer' }}>
                              Sabe ler {ordemCol === 'leitura' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th onClick={() => handleOrdenar('escrita')} style={{ cursor: 'pointer' }}>
                              Sabe escrever {ordemCol === 'escrita' ? (ordemDirecao === 'asc' ? <FaSortUp /> : <FaSortDown />) : <FaSort className="text-muted" style={{opacity: 0.3}}/>}
                           </th>

                           <th>Detalhes</th>
                           <th>Editar</th>
                        </tr>
                     </thead>

                     <tbody> 
                        {pacientesOrdenados.length > 0 ? (
                           pacientesOrdenados.map(paciente => (
                              <tr key={paciente.id}>
                                 <td>{paciente.nome}</td>
                                 <td>{paciente.motivo}</td>
                                 <td>{paciente.desfecho}</td>
                                 <td><PatternFormat displayType="text" value={paciente.registro_visita} format="######-###" mask=" "/></td>
                                 <td>{paciente.nome}</td>
                                 <td><PatternFormat displayType="text" value={paciente.cpf} format="###.###.###-##" mask=" "/></td>
                                 <td>{paciente.data_nascimento ? new Date(paciente.data_nascimento).toLocaleString('pt-BR') : ""}</td>
                                 <td>{paciente.genero}</td>

                                 <td>{paciente.etnia}</td>
                                 <td>{paciente.estado_civil}</td>
                                 <td>{paciente.nacionalidade}</td>
                                 <td>{paciente.naturalidade_estado}</td>
                                 <td>{paciente.naturalidade_municipio}</td>
                                 <td>{paciente.num_telefone}</td>
                                 <td>{paciente.email}</td>

                                 <td>
                                    <div className="table-icons" onClick={() => (setPacienteId(paciente.id), setDetalhesRegistro(true))}>
                                       <MdContentPasteSearch />
                                    </div>
                                    </td>
                                 <td>  {/* Modal a ser reconsiderado */}
                                    <div className="table-icons" onClick={() => setEditarRegistro(true)}>
                                       <img src={'client/public/edit.svg'}/>
                                    </div>
                                 </td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan="9" className="text-center p-4">Nenhum registro encontrado para sua busca.</td>
                           </tr>
                        )}
                     </tbody>
                  </table>

                  <div>
                     {/* Modal: Editar */}
                     {exibirModal_editarPaciente && <Modal_EditarRegistro onClose={() => setEditarRegistro(false)} />}   {/* Modal a ser reconsiderado */}
                        
                     {/* Modal: Detalhes (mais informações) */}
                     {exibirModal_detalhesPaciente && <Modal_DetalhesRegistro onClose={() => setDetalhesRegistro(false)} pacienteId={pacienteId}/>} 
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Agente_altUsuario;