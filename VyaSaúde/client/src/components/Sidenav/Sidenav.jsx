import './Sidenav.css'
import { Link } from "react-router-dom";

function Sidenav() {
   return (
      <nav className='sidenav'>
         <div className='group1-sidenav text-white'>
            <div className='botoes-sidenav'>
               <p>Ocultar</p>
            </div>
            <div className='botoes-sidenav'>
               <Link to="/Agente_novoPaciente"><p className='text-white'>Cadastrar Paciente</p></Link>
            </div>
            <div className='botoes-sidenav'>
               <Link to="/Agente_alterarPaciente"><p>Alterar Paciente</p></Link>
            </div>
            <div className='botoes-sidenav'>
               <Link to="/Agente_consultas"><p>Agenda de Consultas</p></Link>
            </div>
            <div className='botoes-sidenav'>
               <Link to="/"><p>Histórico de Visitas</p></Link>
            </div>
         </div>

         <div className='group2-sidenav'>
            <div className='botoes-sidenav'>
               <p>Meu Perfil</p>
            </div>
            <div className='botoes-sidenav'>
               <p>Dashboards</p>
            </div>
            <div className='botoes-sidenav'>
               <p>Configurações</p>
            </div>
         </div>
      </nav>
   )
};

export default Sidenav;