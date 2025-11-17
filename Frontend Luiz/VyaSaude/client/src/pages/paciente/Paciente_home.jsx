import "./Paciente.css"
import Header from "../../components/Header/"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import BoxSimpleInfos from "../../components/BoxSimpleInfos/Index.jsx";
import Sidenav from "../../components/Sidenav/Sidenav_paciente/"
import ButtonAjuda from "../../components/ButtonAjuda"
import { useUsuario } from '../../context/UsuarioContext';

import more from '../../components/Sidenav/iconsSideBar/more.png';
import AddUserMale     from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';
import HomeAddress     from '../../components/Sidenav/iconsSideBar/Home Address.png';

function Paciente_home() {
   const { setUsuario, usuario } = useUsuario();

   return(
      <div className="app">
         <Header/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '' }]} />
         <Sidenav/>
         <ButtonAjuda/>
         <NavBar items={[
            { label: 'Home', href: '/paciente_home', icon: HomeAddress },
            { label: 'Perfil', href: '/Paciente_perfil', icon: UserManagerIcon },
            { label: 'Consultas', href: '/Paciente_hist-consultas', icon: query },
            { label: 'Dash', href: '/Paciente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-home">
            <div className="title_Home">
               <img src={more} id="logoMore"/><br /><br />
               <h2><b>Olá, {usuario.nome}!</b></h2> {/* PRONTO PRA ESTILIZAR: NOME DO USUARIO DINAMICO */}
               <h4>Bem-vindo(a) à sua área do paciente.</h4>
            </div>

            {/* <p><b>Navegar para:</b></p> */}
            <div className="shortcutField paciente-home">
            </div>

            <div className="gridBoxOtherOptions">
               <div className="gridBoxOptions_lines">
                  <BoxSimpleInfos
                     icon={UserManagerIcon}
                     title="Meu Perfil"
                     description="Verifique, edite e atualize suas informações pessoais (nome, endereço, telefone e email)"
                     linkTo="/Paciente_perfil"
                     buttonText="Visualizar perfil"
                  />
                  <BoxSimpleInfos
                     icon={query}
                     title="Histórico de Consultas"
                     description="Área para visualizar o histórico de consultas, assim como consultas futuras"
                     linkTo="/Paciente_hist-consultas"
                     buttonText="Clique para mais"
                  />
               </div>

               <div className="gridBoxOptions_lines">
                  <BoxSimpleInfos
                     icon={dashIcon}
                     title="Área de Dashboards"
                     description="Visualize, altere e faça análises com nossos dashboards personalizados para melhor monitorar a saúde da sua região"
                     linkTo="/Paciente_dashboards"
                     buttonText="Ir para Dashboards"
                  />
               </div>  
            </div>
         </main>
      </div>
   )
}


export default Paciente_home;