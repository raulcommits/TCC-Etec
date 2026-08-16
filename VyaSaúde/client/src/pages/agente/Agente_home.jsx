import React from "react";
import "./Agente.css"
import Header from "../../components/Header/Header"
import Sidenav from "../../components/Sidenav/Sidenav"
import { Link } from "react-router-dom";

function Agente_home() {
   return(
      <>
         <Header/>
         <div className="d-flex">
            <Sidenav/>
            <div className="d-block Home_Content justify-content-center">
               <div className="title_Home w-100">
                  <h1>Página Inicial<br/>(Agente)</h1>
               </div>
               <div className="grid-container_Home">
                  <div className="grid-items_Home"><Link to="/Agente_novoPaciente"><p>Cadastrar novo paciente</p></Link></div>
                  <div className="grid-items_Home"><Link to="/Agente_consultas"><p>Agenda de Consultas</p></Link></div>
                  <div className="grid-items_Home"><Link to=""><p className="text-danger">Dashboards</p></Link></div>
                  <div className="grid-items_Home"><Link to="/Agente_alterarPaciente"><p>Alterar dados do paciente</p></Link></div>
                  <div className="grid-items_Home"><Link to=""><p className="text-danger">Histórico de Visitas Domiciliares</p></Link></div>
                  <div className="grid-items_Home"><Link to=""><p className="text-danger">Perfil do Agente</p></Link></div>
            </div>
            </div>
         </div>
      </>
   )
}

export default Agente_home;