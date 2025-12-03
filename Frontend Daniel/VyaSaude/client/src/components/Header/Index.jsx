import './Index.css'
import { getUser } from '../../helpers/auth.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
   const navigate = useNavigate();

   const [usuario, setUsuario] = useState();

   useEffect(() => {
      function obterUsuario() {
         const usuario = getUser();
         setUsuario(usuario);
      }
      obterUsuario();
   }, []);


   useEffect(() => {
      async function redirecionar() {
         if (usuario === null) {
            handleLogout();
         }
      }
      redirecionar();
   }, [usuario === null]);


   const homeNavigate = () => {     //  Função pra redirecionar pra Home de acordo com o usuário
      if (usuario.tipoUsuario) {
         navigate(`/${usuario.tipoUsuario}_home`);
      }
   };

   
   const handleLogout = () => {     //  Função pra remover o token quando deslogar, e redirecionar pra tela de Login
      navigate("/login");
      sessionStorage.removeItem("token");
   };


   return (
      <header>
         <div className='logo_div'>
            <img src="client\public\Logo.png" />
            <div className="titulosEstilo2 tituloLogo">VyaSaúde</div>
         </div>
         <div className='accountmenu_div'>
            {/* <p>Tempo restante da sessão: {tempoRestante}</p> */}
            <div className='cursorPointer' onClick={homeNavigate}>
               <img className='accountmenu_img' src="client\public\placeholder.png" />
            </div>
            <span>{usuario?.nome}</span>
            <div className='cursorPointer' onClick={handleLogout}>
               <svg 
               viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g fill="transparent"id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier" fill="transparent"> <path d="M14 7.63636L14 4.5C14 4.22386 13.7761 4 13.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 19.5C4 19.7761 4.22386 20 4.5 20L13.5 20C13.7761 20 14 19.7761 14 19.5L14 16.3636" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
         </div>
      </header>
   )
};

export default Header;