import "./Paciente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_paciente/"
import { Link } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack/Index"
import PageWIP from "../../components/PageWIP/Index"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';

function Paciente_dashboards() {
   // return(
   //    <div className="app">
   //       <Header/>
   //       <Sidenav/>
   //       <main className="content-home">
   //          <div className="title_Home">
   //             <h1><b>Dashboards</b><br/>(Paciente)</h1>
   //          </div>

   //          <div className="grid-container_Home paciente-home">

   //          </div>
   //       </main>
   //    </div>
   // )
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '' }]} />
         <NavBar items={[
            { label: 'Home', href: '/paciente_home', icon: HomeAddress },
            { label: 'Perfil', href: '/Paciente_perfil', icon: UserManagerIcon },
            { label: 'Consultas', href: '/Paciente_hist-consultas', icon: query },
            { label: 'Dash', href: '/Paciente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-home" style={{position: "relative"}}>
            <Link to="/Paciente_home" className="backButton">
               <ButtonBack />
            </Link>

            <div className="title_Home">
               <h1><b>Dashboards</b></h1>
            </div>

            <PageWIP />

         </main>
      </div>
   )
}

export default Paciente_dashboards;