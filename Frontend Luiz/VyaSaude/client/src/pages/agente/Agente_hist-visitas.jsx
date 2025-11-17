import "./Agente.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import api from '../../services/api';

import Header from "../../components/Header/Index"
import Sidenav from "../../components/Sidenav/Sidenav_agente"

import Modal_NovoRegistro from "../../components/Modal_NovoRegistro/Index";
import Modal_EditarRegistro from "../../components/Modal_EditarRegistro/Index";
import Modal_DetalhesRegistro from "../../components/Modal_DetalhesRegistro/Index";

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
         <main className="content-pages">
            <div className="agente-histVisitas d-block" style={{position: "relative"}}>
               <div className="title-pages">
                  <svg onClick={() => navigate(-1)} style={{ cursor:"pointer" }} className="align-self-start"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#000000"></path> </g></svg>
                  <h1 className="align-self-center h2 px-5">Consulta de Visitas Domiciliares</h1>
               </div>
               
               <div className="subtitle">
                  <h4 className="h4 text-success">Registros realizados</h4>
                  <div className="d-flex justify-content-between">
                     <Button variant="outline-success" className="icons" onClick={() => setNovoRegistro(true)}>
                        <img src={'client/public/new.svg'}/>
                        <span> Novo registro</span>
                     </Button>
                     <Button variant="outline-success" className="icons" onClick={() => setRecarregar(!recarregar)}>
                        <img src={'client/public/refresh.svg'}/>
                        <span> Recarregar Registros</span>
                     </Button>
                  </div>
               </div>
               
               <br></br>

               <table className="table table-hover agente-histVisitas">
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
                           <td>{registro.registro_visita}</td>
                           <td>{registro.paciente.nome}</td>
                           <td>{registro.paciente.cpf}</td>
                           <td>{new Date(registro.data_visita).toLocaleString('pt-BR')}</td>
                           <td>{registro.agente.nome_agente}</td>
                           <td>{registro.motivo}</td>
                           <td>{registro.desfecho}</td>
                           <td>
                              <div className="table-icons" onClick={() => (setRegistroId(registro.id), setDetalhesRegistro(true))}>
                                 <img src={'client/public/zoom.svg'}/>
                              </div>
                              </td>
                           <td>
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
                  {exibirModal_editarRegistro && <Modal_EditarRegistro onClose={() => setEditarRegistro(false)} />} 
                     
                  {/* Modal: Detalhes (mais informações) */}
                  {exibirModal_detalhesRegistro && <Modal_DetalhesRegistro onClose={() => setDetalhesRegistro(false)} registroId={registroId}/>} 
               </div>
            </div>
         </main>
      </div>
  );
}

export default Agente_histVisitas;