import '../../Sidenav/Index.css'
import { Link } from "react-router-dom";

import UserManagerIcon from '../iconsSideBar/UserManagerIcon.png';
import ClosePane       from '../iconsSideBar/Close Pane.png';
import configIcon      from '../iconsSideBar/configIcon.png';
import dashIcon        from '../iconsSideBar/dashIcon.png';
import dbIcon          from '../iconsSideBar/dbIcon.png';
import HomeAddress     from '../iconsSideBar/Home Address.png';
import OrgManagericon  from '../iconsSideBar/OrgManagericon.png';
import query           from '../iconsSideBar/query.png';
import AddUserMale     from '../iconsSideBar/Add User Male.png';
import home            from '../iconsSideBar/Home.png';

// Página Inicial
// Cadastro de Pacientes
// Cadastro de Endereços
// Histórico de Consultas
// Histórico de Visitas
// Banco de Dados
// Perfil
// Dashboards

function Sidenav() {
   return (
      <aside className="sidenav">
         <div className="sidenav-content">
            <div className='sidenav-group1'>
               
               <Link to="/Admin_home">
               <div className='sidenav-buttons'>
                  <img src={home} className="sideBarIcon"/>
                  <p>Página Inicial</p>
               </div>
               </Link>

               <Link to="/Admin_home-usuario">
               <div className='sidenav-buttons'>
                  <img src={AddUserMale} className="sideBarIcon"/>
                  <p>Cadastro de Pacientes</p>
               </div>
               </Link>

               <Link to="/Admin_home-endereco">
               <div className='sidenav-buttons'>
                  <img src={HomeAddress} className="sideBarIcon"/>
                  <p>Cadastro de Endereços</p>
               </div>
               </Link>

               <Link to="/Admin_hist-consultas">
               <div className='sidenav-buttons'>
                  <img src={query} className="sideBarIcon"/>
                  <p>Histórico de Consultas</p>
               </div>
               </Link>

               <Link to="/Admin_hist-visitas">
               <div className='sidenav-buttons'>
                  <img src={query} className="sideBarIcon"/>
                  <p>Agenda de Visitas</p>
               </div>
               </Link>

               <Link to="/Admin_b-dados">
               <div className='sidenav-buttons'>
                  <img src={dashIcon} className="sideBarIcon"/>
                  <p>Banco de dados</p>
               </div>
               </Link>
            </div>

            <div className='sidenav-group2'>

               <Link to="/Admin_perfil">
               <div className='sidenav-buttons'>
                  <img src={UserManagerIcon} className="sideBarIcon"/>
                  <p>Meu Perfil</p>
               </div>
               </Link>

               <Link to="/Admin_dashboards">
               <div className='sidenav-buttons'>
                  <img src={dashIcon} className="sideBarIcon"/>
                  <p>Dashboards</p>
               </div>
               </Link>

            </div>

         </div>
      </aside>
   )
};

export default Sidenav;