import "./Agente.css"
import Header from "../../components/Header"
import Sidenav from "../../components/Sidenav/Sidenav_agente"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import PageWIP from "../../components/PageWIP/Index";
import ButtonBack from "../../components/ButtonBack/Index"
import { Link, useNavigate  } from "react-router-dom";

function Agente_altUsuario() {
   return(
      <div className="app">
         <Header/>
         {/* <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />}
                  items={[
                     { label: 'Home', href: '/Agente_home' },
                     { label: 'Meu Perfil', href: '/Agente_perfil' }
                     ]} /> */}
         <Sidenav/>
         <main className="content-home" style={{position: "relative"}}>
            <Link to="/Agente_home" className="backButton">
               <ButtonBack />
            </Link>

            <PageWIP/>
            
         </main>
      </div>
   )
}

export default Agente_altUsuario;