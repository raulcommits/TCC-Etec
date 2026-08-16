import React from "react";
import Header from "../../components/Header/Header"
import Sidenav from "../../components/Sidenav/Sidenav"
import { Form } from '../../Styles/Login/BootstrapComponents';

function Agente_consultas() {
   return(
      <>
         <Header/>
         <div>
            <Sidenav/>
            <div className="d-block Home_Content justify-content-center">
               <div className="d-flex">
                  <div>Voltar</div>
                  <div className="title_Home w-100"><h1>Agente_Consultas<br/>(Agente)</h1></div>
               </div>
               <Form>
                  <div> {/* Consulta pelos dados do paciente */}
                     <Form.Label>Nome do Paciente</Form.Label><Form.Control type='text' placeholder='Insira o nome completo'/>
                  </div>
                  <div>
                     <Form.Label>CPF</Form.Label><Form.Control type="number" placeholder='CPF'/>
                  </div>
                  <div>
                     <Form.Label>Nº Sus</Form.Label><Form.Control type='number' placeholder='Nº Sus'/>
                  </div>

                  <hr/>

                  <div> {/* Consulta pelos integrantes da familia */}
                     <Form.Label>Nº Familia</Form.Label><Form.Control type='number' placeholder='Nº Familia'/>
                  </div>
                  <div>
                     <Form.Label>Integrantes</Form.Label><Form.Control type='text' placeholder='Integrantes'/>
                  </div>

                 <hr/>
                  
                  <div> {/* Consulta pelo profissional médico */}
                     <Form.Label>Profissional</Form.Label><Form.Control type='text' placeholder='Profissional'/>
                  </div>
                  <div>
                     <Form.Label>CRM</Form.Label><Form.Control type='text' placeholder='CRM'/>
                  </div>
               </Form>
            </div>
         </div>
      </>
   )
}

export default Agente_consultas;