import "./Gerente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_gerente/"
import { Link, useNavigate  } from "react-router-dom";

function Gerente_homeEndereco() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Home Endereco</b><br/>(Gerente)</h1>
            </div>

            <div className="shortcutField paciente-home">
               <Link to='/Gerente_cad-endereco'><div className="shortcutClick"><p>Cadastrar novo endereço</p></div></Link>
               <Link to='/Gerente_alt-endereco'><div className="shortcutClick"><p>Alterar endereços</p></div></Link>
            </div>
         </main>
      </div>
   )
}

export default Gerente_homeEndereco;