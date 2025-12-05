import "./Admin.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_admin/"
import { Form } from 'react-bootstrap';

function Admin_altUsuario() {
   return(
      <>
         <Header/>
         <div>
            <Sidenav/>
            <div className="d-block teste Home_Content justify-content-center">
               <div className="d-flex">
                  <div>svg_Voltar</div>
                  <div className="title_Home w-100"><h1>Cadastro_Pacientes</h1></div>
               </div>
               <Form>
                  <div>
                     <Form.Label>Nome</Form.Label><Form.Control type='text' placeholder='Insira o nome completo'/>
                  </div>
                  <div>
                     <Form.Label>Nome Social</Form.Label><Form.Control type='text' placeholder='Nome Social'/>
                  </div>
                  <div>
                     <Form.Label>CPF</Form.Label><Form.Control type='number' placeholder='CPF'/>
                  </div>
                  <div>
                     <Form.Label>RG</Form.Label><Form.Control type='number' placeholder='RG'/>
                  </div>
                  <div>
                     <Form.Label>Nº SUS</Form.Label><Form.Control type='number' placeholder='Nº SUS'/>
                  </div>
                  <div>
                     <Form.Label>Data de Nascimento</Form.Label><Form.Control type='date' placeholder='Data de Nascimento'/>
                  </div>
                  <div>
                     <Form.Label>Gênero</Form.Label><Form.Control type='text' placeholder='Gênero'/>
                  </div>
                  <div>
                     <Form.Label>Etnia</Form.Label><Form.Control type='text' placeholder='Etnia'/>
                  </div>
                  <div>
                     <Form.Label>Nacionalidade</Form.Label><Form.Control type='text' placeholder='Nacionalidade'/>
                  </div>
                  <div>
                     <Form.Label>Estado</Form.Label><Form.Control type='text' placeholder='Estado'/>
                  </div>
                  <div>
                     <Form.Label>Municipio</Form.Label><Form.Control type='text' placeholder='Municipio'/>
                  </div>
                  <div>
                     <Form.Label>Nome da mãe</Form.Label><Form.Control type='text' placeholder='Nome da mãe'/>
                  </div>
                  <div>
                     <Form.Label>Nome do pai</Form.Label><Form.Control type='text' placeholder='Nome do pai'/>
                  </div>
                  <div>
                     <Form.Label>Estado Civil</Form.Label><Form.Control type='text' placeholder='Estado Civil'/>
                  </div>

                  <hr/>

                  <div>
                     <Form.Label>Telefone</Form.Label><Form.Control type='number' placeholder='Telefone'/>
                  </div>
                  <div>
                     <Form.Label>Celular</Form.Label><Form.Control type='number' placeholder='Celular'/>
                  </div>
                  <div>
                     <Form.Label>E-mail</Form.Label><Form.Control type='email' placeholder='E-mail'/>
                  </div>

                  <hr/>

                  <div>
                     <Form.Label>Profissão</Form.Label><Form.Control type='text' placeholder='Profissão'/>
                  </div>
                  <div>
                     <Form.Label>CBO</Form.Label><Form.Control type='number' placeholder='CBO'/>
                  </div>
                  <div>
                     <Form.Label>Escolaridade</Form.Label><Form.Control type='text' placeholder='Escolaridade'/>
                  </div>
                  <div>
                     <Form.Label>Nome da Instituição</Form.Label><Form.Control type='text' placeholder='Nome da Instituição'/>
                  </div>
                  <div>
                     <Form.Label>Tipo de Insituição</Form.Label><Form.Control type='text' placeholder='Tipo de Insituição'/>
                  </div>

                  <hr/>

                  <div>
                     Sabe ler? <Form.Check id="" type="switch" checked/>
                     Sabe escrever? <Form.Check id="" type="switch" checked/>
                  </div>
               </Form>
            </div>
         </div>
      </>
   )
}

export default Admin_altUsuario;