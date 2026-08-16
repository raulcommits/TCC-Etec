import React from "react";
import Header from "../../components/Header/Header";
import Sidenav from "../../components/Sidenav/Sidenav"

function Agente_alterarPaciente() {
   return(
      <>
         <Header/>
         <div>
            <Sidenav/>
            <div className="d-block Home_Content justify-content-center">
               <div className="title_Home w-100">
                  <h1>Agente_alterarPaciente<br/>(Agente)</h1>
               </div>
            </div>
         </div>
      </>
   )
}

export default Agente_alterarPaciente;