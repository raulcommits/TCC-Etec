import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import PageWIP from "../../components/PageWIP/Index";
import ButtonBack from "../../components/ButtonBack/Index"
import { Link, useNavigate  } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import AddUserMale from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';

function Agente_homeEndereco() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '' }]} />
         <NavBar items={[
            { label: 'Home', href: '/agente_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Agente_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Agente_hist-visitas', icon: query },
            { label: 'Dash', href: '/Agente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-home" style={{position: "relative"}}>
            <Link to="/Agente_home" className="backButton">
               <ButtonBack />
            </Link>

            <div className="title_Home">
               <h1><b>Cadastro de Endereços</b></h1>
            </div>

            <div className="simpleBoxShadow">
               <h4>Selecione uma das opções abaixo</h4> <br />
            
               <div className="shortcutField paciente-home">
                  <Link to='/Agente_home-endereco'><div className="shortcutClick"><p>Cadastrar novo endereço</p></div></Link>
                  <Link to='/Agente_home-endereco'><div className="shortcutClick"><p>Alterar endereços</p></div></Link>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Agente_homeEndereco;