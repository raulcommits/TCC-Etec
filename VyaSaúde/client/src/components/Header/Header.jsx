import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
   return (
      <header>
         <div className='logo_div'>
            <img src="client\public\Logo.png" />
         </div>
         <div className='accountmenu_div'>
            <Link to="/Agente_home">
               <img className='accountmenu_img' src="client\public\placeholder.png" />
            </Link>
            <span>userName</span>
            <Link to="/">
               <svg viewBox="0 0 24 24" fill="transparent" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g fill="transparent"id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier" fill="transparent"> <path d="M14 7.63636L14 4.5C14 4.22386 13.7761 4 13.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 19.5C4 19.7761 4.22386 20 4.5 20L13.5 20C13.7761 20 14 19.7761 14 19.5L14 16.3636" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </Link>
         </div>
      </header>
   )
};

export default Header;