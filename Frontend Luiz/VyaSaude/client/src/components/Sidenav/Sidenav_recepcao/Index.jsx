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
// Perfil
// Dashboards

function Sidenav() {
   return (
      <aside className="sidenav">
         <div className="sidenav-content">
            <div className='sidenav-group1'>
               
               <Link to="/Recepcao_home">
               <div className='sidenav-buttons'>
                  <img src={home} className="sideBarIcon"/>
                  <p>Página Inicial</p>
               </div>
               </Link>

               <Link to="/Recepcao_cad-usuario">
               <div className='sidenav-buttons'>
                  <img src={AddUserMale} className="sideBarIcon"/>
                  <p>Cadastro de Pacientes</p>
               </div>
               </Link>

               <Link to="/Recepcao_cad-endereco">
               <div className='sidenav-buttons'>
                  <img src={HomeAddress} className="sideBarIcon"/>
                  <p>Cadastro de Endereços</p>
               </div>
               </Link>

               <Link to="/Recepcao_hist-consultas">
               <div className='sidenav-buttons'>
                  <img src={query} className="sideBarIcon"/>
                  <p>Histórico de Consultas</p>
               </div>
               </Link>

            </div>

            <div className='sidenav-group2'>

               <Link to="/Recepcao_perfil">
               <div className='sidenav-buttons'>
                  <img src={UserManagerIcon} className="sideBarIcon"/>
                  <p>Meu Perfil</p>
               </div>
               </Link>

               <Link to="/Recepcao_dashboards">
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