import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes


// Rotas de Login
import Login from '../pages/login/Login'
import Recuperar from '../pages/login/Recuperar'
import Cadastro from '../pages/login/Cadastro'

// Rotas de Agente
import Agente_home from '../pages/agente/Agente_home'
import Agente_consultas from '../pages/agente/Agente_consultas'
import Agente_novoPaciente from '../pages/agente/Agente_novo-paciente'
import Agente_alterarPaciente from '../pages/agente/Agente_alterar-paciente'

// Rotas de Paciente
import Paciente_home from '../pages/paciente/Paciente_home'


export default function AppRoutes() {
   return (
      <Router>
         <Routes>
            <Route path="/"                        element={<Login />} />
            <Route path="/cadastro"                element={<Cadastro />} />
            <Route path="/recuperar"               element={<Recuperar />} />

            <Route path="/Agente_home"             element={<Agente_home />} />
            <Route path="/Agente_consultas"        element={<Agente_consultas />} />
            <Route path="/Agente_novoPaciente"     element={<Agente_novoPaciente />} />
            <Route path="/Agente_alterarPaciente"  element={<Agente_alterarPaciente />} />

            <Route path="/Paciente_home"           element={<Paciente_home />} />
         </Routes>
      </Router>
   );
}