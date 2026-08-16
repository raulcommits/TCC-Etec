import "./Recepcao.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_recepcao/"
import { Link, useNavigate  } from "react-router-dom";

function Recepcao_homeEndereco() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Home Endereço</b><br/>(Recepção)</h1>
            </div>

            <div className="shortcutField paciente-home">
               <Link to='/Agente_cad-endereco'><div className="shortcutClick"><p>Cadastrar novo endereço</p></div></Link>
               <Link to='/Agente_alt-endereco'><div className="shortcutClick"><p>Alterar endereços</p></div></Link>
            </div>
         </main>
      </div>
   )
}

export default Recepcao_homeEndereco;