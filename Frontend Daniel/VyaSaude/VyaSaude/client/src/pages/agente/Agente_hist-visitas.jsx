import "./Agente.css"
import api from '../../services/api';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { PatternFormat } from "react-number-format";

import Header from "../../components/Header"
import Sidenav from "../../components/Sidenav/Sidenav_agente"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import AddUserMale from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';

import Modal_NovoRegistro from "../../components/Modal_NovoRegistro";
import Modal_EditarRegistro from "../../components/Modal_EditarRegistro";
import Modal_DetalhesRegistro from "../../components/Modal_DetalhesRegistro";

import { GoReply } from "react-icons/go";
import { MdContentPasteSearch } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";

function Agente_histVisitas() {
   const navigate = useNavigate();

   const [exibirModal_novoRegistro, setNovoRegistro] = useState(false); // Abertura e fechamento do Modal de Novo Registro
   const [exibirModal_editarRegistro, setEditarRegistro] = useState(false); // Abertura e fechamento do Modal de Novo Registro
   const [exibirModal_detalhesRegistro, setDetalhesRegistro] = useState(false); // Abertura e fechamento do Modal de Novo Registro

   const [recarregar, setRecarregar] = useState(false);
   
   const [registros, setRegistros] = useState([]);

   const [registroId, setRegistroId] = useState(undefined);
   
   useEffect(() => {
      async function buscarRegistros() {
         try {
            const resposta = await api.get('/registro');
            const respostaArray = resposta.data;
            setRegistros(respostaArray)
            console.log("Registros: ", resposta.data);
         } catch(err) {
            console.log(err);
         }
      };

      buscarRegistros();
   }, [recarregar]);
      
   return (
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />}
                  items={[
                     { label: 'Home', href: '/Agente_home' },
                     { label: 'Agenda de Visitas', href: '/Agente_hist-visitas' }
                     ]} />
         <NavBar items={[
            { label: 'Home', href: '/agente_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Agente_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Agente_hist-visitas', icon: query },
            { label: 'Dash', href: '/Agente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-pages">
            <div className="content-pages-agente">
               <div className="content-agente_histVisitas d-block" style={{position: "relative"}}>
                  <div className="title-pages">
                     <GoReply onClick={() => navigate(-1)}/>
                     <h1 className="align-self-center h2 px-5">Consulta de Visitas Domiciliares</h1>
                  </div>
                  
                  <div className="subtitle">
                     <h4 className="h4 text-success">Registros realizados</h4>
                     <div className="botoes">
                        <Button variant="outline-success" className="icons" onClick={() => setNovoRegistro(true)}>
                           <MdAssignmentAdd />
                           <span> Novo registro</span>
                        </Button>
                        <Button variant="outline-success" className="icons" onClick={() => setRecarregar(!recarregar)}>
                           <MdOutlineRefresh />
                           <span> Recarregar Registros</span>
                        </Button>
                     </div>
                  </div>
                  
                  <br></br>

                  <table className="table table-hover table-agente_histVisitas">
                     <thead>
                        <tr>
                           <th>Registro da visita</th>
                           <th>Paciente</th>
                           <th>CPF</th>
                           <th>Data/Hora</th>
                           <th>Agente</th>
                           <th>Motivo</th>
                           <th>Desfecho</th>
                           <th>Detalhes</th>
                           <th>Editar</th>
                        </tr>
                     </thead>

                     <tbody> 
                        {registros.map(registro => 
                           <tr key={registro.id}>
                              <td><PatternFormat displayType="text" value={registro.registro_visita} format="######-###" mask=" "/></td>
                              <td>{registro.paciente.nome}</td>
                              <td><PatternFormat displayType="text" value={registro.paciente.cpf} format="###.###.###-##" mask=" "/></td>
                              <td>{new Date(registro.data_visita).toLocaleString('pt-BR')}</td>
                              <td>{registro.agente.nome_agente}</td>
                              <td>{registro.motivo}</td>
                              <td>{registro.desfecho}</td>
                              <td>
                                 <div className="table-icons" onClick={() => (setRegistroId(registro.id), setDetalhesRegistro(true))}>
                                    <MdContentPasteSearch />
                                 </div>
                                 </td>
                              <td>  {/* Modal a ser reconsiderado */}
                                 <div className="table-icons" onClick={() => setEditarRegistro(true)}>
                                    <img src={'client/public/edit.svg'}/>
                                 </div>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>

                  <div>
                     {/* Modal: Novo registro */}
                     {exibirModal_novoRegistro && <Modal_NovoRegistro onClose={() => setNovoRegistro(false)} onSuccess={() => {setRecarregar(!recarregar); setNovoRegistro(false)}} />}

                     {/* Modal: Editar */}
                     {exibirModal_editarRegistro && <Modal_EditarRegistro onClose={() => setEditarRegistro(false)} />}   {/* Modal a ser reconsiderado */}
                        
                     {/* Modal: Detalhes (mais informações) */}
                     {exibirModal_detalhesRegistro && <Modal_DetalhesRegistro onClose={() => setDetalhesRegistro(false)} registroId={registroId}/>} 
                  </div>
               </div>
            </div>
         </main>
      </div>
  );
}

export default Agente_histVisitas;