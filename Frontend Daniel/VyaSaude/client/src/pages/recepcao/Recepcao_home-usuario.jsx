import "./Recepcao.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_recepcao/"
import { Link, useNavigate  } from "react-router-dom";

function Recepcao_homeUsuario() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Home Usuário</b><br/>(Recepção)</h1>
            </div>

            <div className="shortcutField paciente-home">
               <Link to='/Recepcao_cad-usuario'><div className="shortcutClick"><p>Cadastrar novo usuário</p></div></Link>
               <Link to='/Recepcao_alt-usuario'><div className="shortcutClick"><p>Alterar usuários</p></div></Link>
            </div>
         </main>
      </div>
   )
}

export default Recepcao_homeUsuario;