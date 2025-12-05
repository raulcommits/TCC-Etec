import "./Agente.css"
import Header from "../../components/Header"
import Sidenav from "../../components/Sidenav/Sidenav_agente"
import PageWIP from "../../components/PageWIP/Index";
import ButtonBack from "../../components/ButtonBack/Index"
import { Link, useNavigate  } from "react-router-dom";

function Agente_altUsuario() {
   return(
      <div className="app">
         <Header/>
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