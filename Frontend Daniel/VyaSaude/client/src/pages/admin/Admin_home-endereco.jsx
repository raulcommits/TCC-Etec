import "./Admin.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_admin/"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import { Link, useNavigate  } from "react-router-dom";

function Admin_homeUsuario() {
   return(
      <div className="app">
         <Header/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '/Admin_home' }]} />
         <Sidenav/>
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Home Enderços</b><br/>(Admin)</h1>
            </div>

            <div className="shortcutField paciente-home">
               <Link to='/Admin_cad-endereco'><div className="shortcutClick"><p>Cadastrar novo endereço</p></div></Link>
               <Link to='/Admin_alt-endereco'><div className="shortcutClick"><p>Alterar endereços</p></div></Link>
            </div>
         </main>
      </div>
   )
}

export default Admin_homeUsuario;