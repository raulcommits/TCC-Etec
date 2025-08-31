import "./Login.css"
import { Form } from '../../Styles/Login/BootstrapComponents';
import { Link } from "react-router-dom";


function Cadastro() {
   return (
      <content>
         <main className="border border-2 border-dark border-opacity-75 shadow-lg rounded-2 bg-secondary-subtle">
            {/* Logo */}
            <div className="d-block gradiente rounded-top-1">
               <p className="d-flex justify-content-center h3 text-light fw-bolder p-3">VyaSaúde</p>
            </div>

            <Form className="border-top border-dark border-2 px-3 py-2">
               {/* Título */}
               <div className="d-block p-3">
                  <p className="d-flex justify-content-center h4 m-2">Cadastrar-se</p>
               </div>
               
               {/* Campo Nome completo */}
               <div className="py-1">
                  <svg 
                  width="233px" height="233px" viewBox="-1.12 -1.12 18.24 18.24" xmlns="http://www.w3.org/2000/svg" fill="#292157" class="bi bi-person-lines-fill" stroke="#292157" stroke-width="0.4"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.22400000000000003"></g><g id="SVGRepo_iconCarrier"> <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"></path> </g></svg>
                  <Form.Control id="campo_nome" type="text" placeholder="Nome completo" className="form-control border-2 border-dark border-opacity-25 rounded-3" minlength="5" maxlength="100" required/>
               </div>

               {/* Campo CPF */}
               <div className="py-1">
                  <svg 
                  width="233px" height="233px" viewBox="-1.12 -1.12 18.24 18.24" xmlns="http://www.w3.org/2000/svg" fill="#292157" class="bi bi-person-lines-fill" stroke="#292157" stroke-width="0.4"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.22400000000000003"></g><g id="SVGRepo_iconCarrier"> <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"></path> </g></svg>
                  <Form.Control id="" type="text" placeholder="CPF" className="form-control border-2 border-dark border-opacity-25 rounded-3" onInput="quantidadeCaracteres(this)" required/>
               </div>
               
               {/* Campo Email */}
               <div className="py-1">
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" /></svg>
                  <Form.Control id="field_email" type="email" placeholder="E-mail" className="form-control border-2 border-dark border-opacity-25 rounded-3" required/>
               </div>

               {/* Campo Confirmação de Email */}
               <div className="py-1">
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" /></svg>
                  <Form.Control id="" type="email" placeholder="Confirme o E-mail" className="form-control border-2 border-dark border-opacity-25 rounded-3"/>
               </div>
               
               {/* Campo senha */}
               <div className="py-1">
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" /></svg>
                  <Form.Control id="" type="password" placeholder="Senha" className="form-control border-2 border-dark border-opacity-25 rounded-3" required/>
               </div>

               {/* Campo Confirmação desenha */}
               <div className="py-1">
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clip-rule="evenodd" /></svg>
                  <Form.Control id="" type="password" placeholder="Confirme a senha" className="form-control border-2 border-dark border-opacity-25 rounded-3"/>
               </div>

               {/* Divisória */}
               <div className="d-block py-3">
                  <hr className="border border-dark border-2 opacity-50"/>
               </div>

               {/* Botão pra realizar cadastro */}
               <div className="justify-content-center py-2">
                  <button id="botao_cadastrar" className="btn btn-light border-dark border-opacity-75 px-4 py-2">Realizar cadastro</button>
               </div>

               {/* Voltar pra tela de login */}
               <div className="justify-content-end py-2">
                  <Link to="/">Voltar pra tela de login</Link>
               </div>
            </Form>
         </main>
      </content>
    )
}

export default Cadastro