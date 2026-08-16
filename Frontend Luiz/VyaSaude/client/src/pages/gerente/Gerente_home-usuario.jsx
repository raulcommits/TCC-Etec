import "./Gerente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_gerente/"
import { Link, useNavigate  } from "react-router-dom";

function Gerente_homeUsuario() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Home Usuario</b><br/>(Gerente)</h1>
            </div>

            <div className="shortcutField paciente-home">
               <Link to='/Gerente_cad-usuario'><div className="shortcutClick"><p>Cadastrar novo usuário</p></div></Link>
               <Link to='/Gerente_alt-usuario'><div className="shortcutClick"><p>Alterar usuários</p></div></Link>
            </div>
         </main>
      </div>
   )
}

export default Gerente_homeUsuario;