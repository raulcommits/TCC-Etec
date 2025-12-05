import "./Admin.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_admin/"
import PageWIP from "../../components/PageWIP"
import { Link, useNavigate  } from "react-router-dom";

function Admin_dashboards() {
   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <main className="content-home">
            <div className="title_Home">
               <h1><b>Dashboards</b></h1>
            </div>

            <PageWIP/>
            
            {/* <div className="grid-container_Home admin_home_grid">

            </div> */}
         </main>
      </div>
   )
}

export default Admin_dashboards;