import "./Admin.css"
import Header from "../../components/Header/"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import BoxSimpleInfos from "../../components/BoxSimpleInfos/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import Sidenav from "../../components/Sidenav/Sidenav_admin/"
import ButtonAjuda from "../../components/ButtonAjuda"
import { getUser } from "../../helpers/auth";

import more from '../../components/Sidenav/iconsSideBar/more.png';
import AddUserMale     from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';
import HomeAddress     from '../../components/Sidenav/iconsSideBar/Home Address.png';
import { Link } from "react-router-dom";

function Admin_home() {
   const usuario = getUser();

   const meusLinks = [
      { label: 'Home', href: '' }
   ];

   const navItems = [
      { label: 'Home', href: '/admin_home', icon: HomeAddress },
      { label: 'Pacientes', href: '/admin_home-usuario', icon: AddUserMale },
      { label: 'Agenda', href: '/admin_hist-visitas', icon: query },
      { label: 'Banco', href: '/admin_b-dados', icon: dashIcon }
   ];
   
   return(
      <div className="app">
         <Header/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />}
                  items={[
                     { label: 'Home', href: '/Admin_home' }
                     ]} />
         <Sidenav/>
         {/* <ButtonAjuda/> */}
         <NavBar items={navItems} />
         <main className="content-home">
            <div className="title_Home">
               <img src={more} id="logoMore"/><br /><br />
               <h2><b>Olá, {usuario.nome}!</b></h2> {/* PRONTO PRA ESTILIZAR: NOME DO USUARIO DINAMICO */}
               <h4>Bem-vindo(a) à sua área do administrador.</h4>
            </div>

            {/* <p><b>Navegar para:</b></p> */}
            <div className="shortcutField paciente-home">
            </div>
            
            <div className="gridBoxOtherOptions">
               <div className="gridBoxOptions_lines">
                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Cadastro de Pacientes</b></h5>
                        <img src={AddUserMale} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Cadastre ou altere informações de pacientes na plataforma
                     </div>
                     <div className="buttonLine">
                        <Link to="/Admin_home-usuario" className="buttonB">Acessar pacientes</Link>
                     </div>
                  </div>

                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Agenda de Visitas</b></h5>
                        <img src={query} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Verifique as datas das últimas visitas realizadas e as próximas visitas agendadas
                     </div>
                     <div className="buttonLine">
                        <Link to="/Admin_hist-visitas" className="buttonB">Acessar agenda</Link>
                     </div>
                  </div>

                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Banco de Dados</b></h5>
                        <img src={dashIcon} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Acesse informações cadastradas no banco de dados da plataforma
                     </div>
                     <div className="buttonLine">
                        <Link to="/Admin_b-dados" className="buttonB">Acessar banco</Link>
                     </div>
                  </div>
               </div>

               <div className="gridBoxOptions_lines">
                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Cadastro de Endereços</b></h5>
                        <img src={HomeAddress} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Cadastre ou altere informações de endereços na plataforma
                     </div>
                     <div className="buttonLine">
                        <Link to="/Admin_home-endereco" className="buttonB">Acessar endereços</Link>
                     </div>
                  </div>

                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Histórico de Consultas</b></h5>
                        <img src={query} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Área para visualizar o histórico de consultas, assim como consultas futuras
                     </div>
                     <div className="buttonLine">
                        <Link to="/Admin_hist-consultas" className="buttonB">Acessar consultas</Link>
                     </div>
                  </div>

                  <div className="boxSimpleInfos">
                     <div className="headerLine">
                        <h5><b>Área de Dashboards</b></h5>
                        <img src={dashIcon} className="headerImage" />
                     </div>
                     <div className="mainLine">
                        Visualize, altere e faça análises com nossos dashboards personalizados para melhor monitorar a saúde da sua região
                     </div>
                     <div className="buttonLine">
                        <Link to="/Admin_dashboards" className="buttonB">Ir para Dashboards</Link>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Admin_home;