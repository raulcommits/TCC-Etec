import "./Ajuda.css"
import Header from "../../components/Header"
import Sidenav from "../../components/Sidenav/Sidenav_paciente"
import PageWIP from "../../components/PageWIP"
import { Link } from "react-router-dom";
import { getUser } from "../../helpers/auth";

import more from '../../components/Sidenav/iconsSideBar/more.png';
import AddUserMale     from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';

function ButtonAjuda() {
   const usuario = getUser();

   return(
      <div className="app">
         <Header/>
         <main className="content-home">
            <PageWIP />
            
         </main>
      </div>
   )
}


export default ButtonAjuda;