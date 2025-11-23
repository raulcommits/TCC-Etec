import '../../App.css';
import './Login.css';
import api from '../../services/api';
import { Form } from 'react-bootstrap';
import { IoPerson } from "react-icons/io5";
import { IoLockClosed } from "react-icons/io5";
import { Link, useNavigate  } from "react-router-dom";
import { useState } from 'react';

function Login() {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   
   async function handleLogin(e) {
      e.preventDefault();

      // Tentativa de realização de login
      try {
         const loginPayload = {email, senha};

         const response = await api.post('/login', loginPayload); // Etapa de verificação dos dados inseridos
         sessionStorage.setItem("token", response.data.token);
         
         const token = sessionStorage.getItem("token");
         
         const usuarioLogado = await api.get('/login/me', {
            headers: {Authorization: `Bearer ${token}`}
         });
         
         console.log(`usuarioLogado: `, usuarioLogado.data);
         alert(response.data.response); // Status do login (erro ou sucesso). -- Remover --
  
         navigate(`/${usuarioLogado.data.tipoUsuario}_home`);
         // -- toast (sucesso) --
      }
      catch(error) {
         alert(error.response); // -- Remover --
         // -- toast (erro) --
         console.log(error.response);
      };
   };

   return (
      <main className="content-login_app-css"> 
         <div className='content-body-login_app-css'>
            <form onSubmit={handleLogin}>
               <div className="d-block p-3">
                  <Form.Label className='d-flex justify-content-center fw-bolder h2 m-2 titulosEstilo3'>
                     VyaSaúde
                  </Form.Label>
               </div>
               <div className="d-block p-3">
                  <Form.Label className='d-flex justify-content-center fw-bolder h4 m-2'>Acesso ao sistema</Form.Label>
               </div>

               <div className="m-2">
                  <div className="fieldsEmailandPassword py-1">
                     <IoPerson/>
                     <Form.Control value={email} onChange={(e) => {setEmail(e.target.value)}} required type="email" placeholder="E-mail" className="form-control border-2 border-dark border-opacity-25 rounded-3"/>
                  </div>
                  
                  <div className="d-flex py-1 fieldsEmailandPassword">
                     <IoLockClosed />
                     <Form.Control value={senha} onChange={(e) => {setSenha(e.target.value)}} required type="password" placeholder="Senha" className="form-control border-2 border-dark border-opacity-25 rounded-3"/>
                  </div>

                  <div className="pt-4 forgotMyPassword">
                     <Link to="/recuperar">Esqueci minha senha</Link>
                  </div>

                  <div className="d-block py-2">
                     <hr className='border border-gray border-2 opacity-50'></hr>
                  </div>

                  <div className="d-flex justify-content-center py-2">
                     <button className="btn btn-light border-dark border-opacity-75 px-4 py-2" type='submit'>Acessar</button>
                  </div><br />
                  
                  <div className='py-2' id='sLogin-newCad'>
                     <p className='px-0 justify-content-end'>Ainda não possui login? <Link to="/cadastro" id='preRegister'>Realizar pré-cadastro</Link></p>
                  </div>
               </div>
            </form>
         </div>

         <br />
         <span className='etecWaterMark'>Projeto desenvolvido para Etec de Embu das Artes - 2025</span>
      </main>
   )
};

export default Login;