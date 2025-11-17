import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import ButtonAjuda from "../../components/ButtonAjuda/Index"
import { Link } from "react-router-dom";
import { getUser } from "../../helpers/auth";

import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import BoxSimpleInfos from "../../components/BoxSimpleInfos/Index.jsx";

import more from '../../components/Sidenav/iconsSideBar/more.png';
import AddUserMale     from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';
import HomeAddress     from '../../components/Sidenav/iconsSideBar/Home Address.png';

function Agente_home() {
   const user = getUser();
   
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <ButtonAjuda/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '' }]} />
         <NavBar items={[
            { label: 'Home', href: '/agente_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Agente_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Agente_hist-visitas', icon: query },
            { label: 'Dash', href: '/Agente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-home">
            <div className="title_Home">
               <img src={more} id="logoMore"/><br /><br />
               <h2><b>Olá, {user.nome}!</b></h2>
               <h4>Bem-vindo(a) à sua área do agente.</h4>
            </div>

            {/* <p><b>Navegar para:</b></p> */}
            <div className="shortcutField paciente-home">
            </div>

            <div className="gridBoxOtherOptions">
               <div className="gridBoxOptions_lines">
                  <BoxSimpleInfos
                     icon={AddUserMale}
                     title="Cadastro de Pacientes"
                     description="Cadastre ou altere informações de pacientes na plataforma"
                     linkTo="/Agente_home-usuario"
                     buttonText="Acessar pacientes"
                  />
                  <BoxSimpleInfos
                     icon={query}
                     title="Agenda de Visitas"
                     description="Verifique as datas das últimas visitas realizadas e as próximas visitas agendadas"
                     linkTo="/Agente_hist-visitas"
                     buttonText="Acessar agenda"
                  />
                  <BoxSimpleInfos
                     icon={UserManagerIcon}
                     title="Meu Perfil"
                     description="Verifique, edite e atualize suas informações pessoais (nome, endereço, telefone e email)"
                     linkTo="/Agente_perfil"
                     buttonText="Visualizar perfil"
                  />
               </div>

               <div className="gridBoxOptions_lines">
                  <BoxSimpleInfos
                     icon={HomeAddress}
                     title="Cadastro de Endereços"
                     description="Cadastre ou altere informações de endereços na plataforma"
                     linkTo="/Agente_home-endereco"
                     buttonText="Acessar endereços"
                  />
                  <BoxSimpleInfos
                     icon={query}
                     title="Histórico de Consultas"
                     description="Área para visualizar o histórico de consultas, assim como consultas futuras"
                     linkTo="/Agente_hist-consultas"
                     buttonText="Acessar consultas"
                  />
                  <BoxSimpleInfos
                     icon={dashIcon}
                     title="Área de Dashboards"
                     description="Visualize, altere e faça análises com nossos dashboards personalizados para melhor monitorar a saúde da sua região"
                     linkTo="/Agente_dashboards"
                     buttonText="Ir para Dashboards"
                  />
               </div>
            </div>
         </main>
      </div>
   )
}

export default Agente_home;