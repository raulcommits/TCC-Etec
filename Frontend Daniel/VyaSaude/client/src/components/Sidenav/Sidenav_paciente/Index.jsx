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
// Histórico de Consultas
// Perfil
// Dashboards

function Sidenav() {
   return (
      <aside className="sidenav">
         <div className="sidenav-content">
            <div className='sidenav-group1'>
               
               <Link to="/Paciente_home">
               <div className='sidenav-buttons'>
                  <img src={home} className="sideBarIcon"/>
                  <p>Página Inicial</p>
               </div></Link>

               {/* O PACIENTE NÃO PODE CADASTRAR NOVO USUÁRIOS */}
               {/* <div className='sidenav-buttons'>
                  <img src={AddUserMale} className="sideBarIcon"/>
                  <Link to="/Paciente_cad-usuario">
                  <p>Cadastro de Pacientes</p></Link>
               </div> */}

               <Link to="/Paciente_hist-consultas">
               <div className='sidenav-buttons'>
                  <img src={query} className="sideBarIcon"/>
                  <p>Histórico de Consultas</p>
               </div></Link>

               {/* <div className='sidenav-buttons'>
                  <img src={query} className="sideBarIcon"/>
                  <Link to="/Paciente_hist-visitas">
                  <p>Agenda de Visitas</p></Link>
               </div> */}

            </div>

            <div className='sidenav-group2'>

               <Link to="/Paciente_perfil">
               <div className='sidenav-buttons'>
                  <img src={UserManagerIcon} className="sideBarIcon"/>
                  <p>Meu Perfil</p>
               </div>
               </Link>

               <Link to="/Paciente_dashboards">
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