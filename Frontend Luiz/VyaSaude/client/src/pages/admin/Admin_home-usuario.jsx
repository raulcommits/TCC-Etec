import "./Admin.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_admin/"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import { Link, useNavigate  } from "react-router-dom";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import AddUserMale from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';


function Admin_homeUsuario() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '' }]} />
         <NavBar items={[
            { label: 'Home', href: '/admin_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Admin_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Admin_hist-visitas', icon: query },
            { label: 'Banco', href: '/Admin_b-dados', icon: dashIcon }
         ]} />
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Home Usuario</b><br/>(Admin)</h1>
            </div>

            <div className="shortcutField paciente-home">
               <Link to='/Admin_cad-usuario'><div className="shortcutClick"><p>Cadastrar novo usuário</p></div></Link>
               <Link to='/Admin_alt-usuario'><div className="shortcutClick"><p>Alterar usuários</p></div></Link>
            </div>
         </main>
      </div>
   )
}

export default Admin_homeUsuario;