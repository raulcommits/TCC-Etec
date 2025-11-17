import "./Gerente.css"
import Header from "../../components/Header/"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import BoxSimpleInfos from "../../components/BoxSimpleInfos/Index.jsx";
import Sidenav from "../../components/Sidenav/Sidenav_gerente/"
import ButtonFAQ from "../../components/ButtonFAQ"
import { useUsuario } from '../../context/UsuarioContext';

import more from '../../components/Sidenav/iconsSideBar/more.png';
import AddUserMale     from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';
import HomeAddress     from '../../components/Sidenav/iconsSideBar/Home Address.png';

function Gerente_home() {
   const { setUsuario, usuario } = useUsuario();
   
   return(
      <div className="app">
         <Header/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '' }]} />
         <Sidenav/>
         <ButtonFAQ/>
         <NavBar items={[
            { label: 'Home', href: '/gerente_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Gerente_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Gerente_hist-visitas', icon: query },
            { label: 'Dash', href: '/Gerente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-home">
            <div className="title_Home">
               <img src={more} id="logoMore"/><br /><br />
               <h2><b>Olá, {usuario.nome}!</b></h2> {/* PRONTO PRA ESTILIZAR: NOME DO USUARIO DINAMICO */}
               <h4>Bem-vindo(a) à sua área de gerente.</h4>
            </div>

            {/* <div className="grid-container_Home paciente-home">

               <Link className="grid-items_Home" to="/Paciente_perfil"><p>Meu perfil</p></Link>

               <Link className="grid-items_Home" to="/Paciente_histConsultas"><p className="text-danger">Histórico de Consultas</p></Link>

            </div> */}


            {/* <p><b>Navegar para:</b></p> */}
            <div className="shortcutField paciente-home">
               {/* <Link
               className="shortcutClick"
               to="/Paciente_perfil">
               <p>Meu perfil</p>
               </Link>

               <Link
               className="shortcutClick"
               to="/Paciente_histConsultas">
               <p>Histórico de Consultas</p>
               </Link> */}
            </div>

            <div className="gridBoxOtherOptions">
               <div className="gridBoxOptions_lines">
                  <BoxSimpleInfos
                     icon={AddUserMale}
                     title="Cadastro de Pacientes"
                     description="Cadastre ou altere informações de pacientes na plataforma"
                     linkTo="/Gerente_home-usuario"
                     buttonText="Acessar pacientes"
                  />
                  <BoxSimpleInfos
                     icon={query}
                     title="Agenda de Visitas"
                     description="Verifique as datas das últimas visitas realizadas e as próximas visitas agendadas"
                     linkTo="/Gerente_hist-visitas"
                     buttonText="Acessar agenda"
                  />
                  <BoxSimpleInfos
                     icon={UserManagerIcon}
                     title="Meu Perfil"
                     description="Verifique, edite e atualize suas informações pessoais (nome, endereço, telefone e email)"
                     linkTo="/Gerente_perfil"
                     buttonText="Visualizar perfil"
                  />
               </div>

               <div className="gridBoxOptions_lines">
                  <BoxSimpleInfos
                     icon={HomeAddress}
                     title="Cadastro de Endereços"
                     description="Cadastre ou altere informações de endereços na plataforma"
                     linkTo="/Gerente_home-endereco"
                     buttonText="Acessar endereços"
                  />
                  <BoxSimpleInfos
                     icon={query}
                     title="Histórico de Consultas"
                     description="Área para visualizar o histórico de consultas, assim como consultas futuras"
                     linkTo="/Gerente_hist-consultas"
                     buttonText="Acessar consultas"
                  />
                  <BoxSimpleInfos
                     icon={dashIcon}
                     title="Área de Dashboards"
                     description="Visualize, altere e faça análises com nossos dashboards personalizados para melhor monitorar a saúde da sua região"
                     linkTo="/Gerente_dashboards"
                     buttonText="Ir para Dashboards"
                  />
               </div> 
            </div>
         </main>
      </div>
   )
}

export default Gerente_home;