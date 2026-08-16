import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccessControl          from './pages/AccessControl'; // Verifica se o usuário logado pode acessar a página.
import { ToastContainer } from "react-toastify";

// ROTAS: LOGIN
import Login                  from './pages/login/Login'
import Recuperar              from './pages/login/Recuperar'
import Cadastro               from './pages/login/Cadastro'

// ROTAS: ajuda
import landPage               from './pages/landpage/landPage.jsx'
import Ajuda                  from './pages/ajuda/Ajuda.jsx'

// ROTAS: ADMINISTRADOR
import Admin_home             from './pages/admin/Admin_home'
import Admin_homeUsuario      from './pages/admin/Admin_home-usuario'
import Admin_homeEndereco     from './pages/admin/Admin_home-endereco'
import Admin_cadUsuario       from './pages/admin/Admin_cad-usuario'
import Admin_cadEndereco      from './pages/admin/Admin_cad-endereco'
import Admin_altUsuario       from './pages/admin/Admin_alt-usuario'
import Admin_histVisitas      from './pages/admin/Admin_hist-visitas'
import Admin_histConsultas    from './pages/admin/Admin_hist-consultas'
import Admin_bDados           from './pages/admin/Admin_b-dados'
import Admin_perfil           from './pages/admin/Admin_perfil'
import Admin_dashboards       from './pages/admin/Admin_dashboards'

// ROTAS: GERENTE
import Gerente_home           from './pages/gerente/Gerente_home'
import Gerente_homeUsuario    from './pages/gerente/Gerente_home-usuario'
import Gerente_homeEndereco   from './pages/gerente/Gerente_home-endereco'
import Gerente_cadUsuario     from './pages/gerente/Gerente_cad-usuario'
import Gerente_altUsuario     from './pages/gerente/Gerente_alt-usuario'
import Gerente_histVisitas    from './pages/gerente/Gerente_hist-visitas'
import Gerente_histConsultas  from './pages/gerente/Gerente_hist-consultas'
import Gerente_perfil         from './pages/gerente/Gerente_perfil'
import Gerente_dashboards     from './pages/gerente/Gerente_dashboards'

// ROTAS: AGENTE
import Agente_home            from './pages/agente/Agente_home'
import Agente_homeUsuario     from './pages/agente/Agente_home-usuario'
import Agente_homeEndereco    from './pages/agente/Agente_home-endereco'
import Agente_cadUsuario      from './pages/agente/Agente_cad-usuario'
import Agente_altUsuario      from './pages/agente/Agente_alt-usuario'
import Agente_histVisitas     from './pages/agente/Agente_hist-visitas'
import Agente_histConsultas   from './pages/agente/Agente_hist-consultas'
import Agente_perfil          from './pages/agente/Agente_perfil'
import Agente_dashboards      from './pages/agente/Agente_dashboards'
import Agente_noPage          from './pages/agente/Agente_noPage'

// ROTAS: RECEPCAO
import Recepcao_home          from './pages/recepcao/Recepcao_home'
import Recepcao_homeUsuario   from './pages/recepcao/Recepcao_home-usuario'
import Recepcao_homeEndereco  from './pages/recepcao/Recepcao_home-endereco'
import Recepcao_cadUsuario    from './pages/recepcao/Recepcao_cad-usuario'
import Recepcao_altUsuario    from './pages/recepcao/Recepcao_alt-usuario'
import Recepcao_histConsultas from './pages/recepcao/Recepcao_hist-consultas'
import Recepcao_perfil        from './pages/recepcao/Recepcao_perfil'
import Recepcao_dashboards    from './pages/recepcao/Recepcao_dashboards'

// ROTAS: PACIENTE
import Paciente_home          from './pages/paciente/Paciente_home'
// import Paciente_homeUsuario   from './pages/paciente/Paciente_home-usuario'
// import Paciente_homeEndereco  from './pages/paciente/Paciente_home-endereco'
import Paciente_altUsuario    from './pages/paciente/Paciente_alt-usuario'
import Paciente_histConsultas from './pages/paciente/Paciente_hist-consultas'
import Paciente_perfil        from './pages/paciente/Paciente_perfil'
import Paciente_dashboards    from './pages/paciente/Paciente_dashboards'


function App() {
   return (
      <Router>
         <Routes>
            
            {/* Rotas: Login */}
            <Route path="/"                           element={<Login />} />
            {/* <Route path="/"                           element={<landPage />} /> */}
            <Route path="/login"                      element={<Login />} />
            <Route path="/cadastro"                   element={<Cadastro />} />
            <Route path="/recuperar"                  element={<Recuperar />} />
            
            {/* Rotas: ajuda */}
            <Route path="/ajuda"                      element={<Ajuda />} />

            {/* Rotas: Administrador */}
            <Route path="/Admin_home"                 element={<AccessControl    tipoPermitido="admin"><Admin_home />               </AccessControl>} />
            <Route path="/Admin_home-usuario"         element={<AccessControl    tipoPermitido="admin"><Admin_homeUsuario />        </AccessControl>} />
            <Route path="/Admin_home-endereco"        element={<AccessControl    tipoPermitido="admin"><Admin_homeEndereco />       </AccessControl>} />
            <Route path="/Admin_cad-usuario"          element={<AccessControl    tipoPermitido="admin"><Admin_cadUsuario />         </AccessControl>} />
            <Route path="/Admin_cad-endereco"         element={<AccessControl    tipoPermitido="admin"><Admin_cadEndereco />        </AccessControl>} />
            <Route path="/Admin_alt-usuario"          element={<AccessControl    tipoPermitido="admin"><Admin_altUsuario />         </AccessControl>} />
            <Route path="/Admin_hist-visitas"         element={<AccessControl    tipoPermitido="admin"><Admin_histVisitas />        </AccessControl>} />
            <Route path="/Admin_hist-consultas"       element={<AccessControl    tipoPermitido="admin"><Admin_histConsultas />      </AccessControl>} />
            <Route path="/Admin_b-dados"              element={<AccessControl    tipoPermitido="admin"><Admin_bDados />             </AccessControl>} />
            <Route path="/Admin_perfil"               element={<AccessControl    tipoPermitido="admin"><Admin_perfil />             </AccessControl>} />
            <Route path="/Admin_dashboards"           element={<AccessControl    tipoPermitido="admin"><Admin_dashboards />         </AccessControl>} />

            {/* Rotas: Gerente */}
            <Route path="/Gerente_home"               element={<AccessControl    tipoPermitido="gerente"><Gerente_home />           </AccessControl>} />
            <Route path="/Gerente_home-usuario"       element={<AccessControl    tipoPermitido="gerente"><Gerente_homeUsuario />    </AccessControl>} />
            <Route path="/Gerente_home-endereco"      element={<AccessControl    tipoPermitido="gerente"><Gerente_homeEndereco />   </AccessControl>} />
            <Route path="/Gerente_cad-usuario"        element={<AccessControl    tipoPermitido="gerente"><Gerente_cadUsuario />     </AccessControl>} />
            <Route path="/Gerente_alt-usuario"        element={<AccessControl    tipoPermitido="gerente"><Gerente_altUsuario />     </AccessControl>} />
            <Route path="/Gerente_hist-visitas"       element={<AccessControl    tipoPermitido="gerente"><Gerente_histVisitas />    </AccessControl>} />
            <Route path="/Gerente_hist-consultas"     element={<AccessControl    tipoPermitido="gerente"><Gerente_histConsultas />  </AccessControl>} />
            <Route path="/Gerente_perfil"             element={<AccessControl    tipoPermitido="gerente"><Gerente_perfil />         </AccessControl>} />
            <Route path="/Gerente_dashboards"         element={<AccessControl    tipoPermitido="gerente"><Gerente_dashboards />     </AccessControl>} />
            
            {/* Rotas: Agente */}
            <Route path="/Agente_home"                element={<AccessControl    tipoPermitido="agente"><Agente_home />             </AccessControl>} />
            <Route path="/Agente_home-usuario"        element={<AccessControl    tipoPermitido="agente"><Agente_homeUsuario />      </AccessControl>} />
            <Route path="/Agente_home-endereco"       element={<AccessControl    tipoPermitido="agente"><Agente_homeEndereco />     </AccessControl>} />
            <Route path="/Agente_cad-usuario"         element={<AccessControl    tipoPermitido="agente"><Agente_cadUsuario />       </AccessControl>} />
            <Route path="/Agente_alt-usuario"         element={<AccessControl    tipoPermitido="agente"><Agente_altUsuario />       </AccessControl>} />
            <Route path="/Agente_hist-visitas"        element={<AccessControl    tipoPermitido="agente"><Agente_histVisitas />      </AccessControl>} />
            <Route path="/Agente_hist-consultas"      element={<AccessControl    tipoPermitido="agente"><Agente_histConsultas />    </AccessControl>} />
            <Route path="/Agente_perfil"              element={<AccessControl    tipoPermitido="agente"><Agente_perfil />           </AccessControl>} />
            <Route path="/Agente_dashboards"          element={<AccessControl    tipoPermitido="agente"><Agente_dashboards />       </AccessControl>} />
            <Route path="/Agente_noPage"              element={<AccessControl    tipoPermitido="agente"><Agente_noPage />            </AccessControl>} />

            {/* Rotas: Recepcao */}
            <Route path="/Recepcao_home"              element={<AccessControl    tipoPermitido="recepcao"><Recepcao_home />         </AccessControl>} />
            <Route path="/Recepcao_home-usuario"      element={<AccessControl    tipoPermitido="recepcao"><Recepcao_homeUsuario />  </AccessControl>} />
            <Route path="/Recepcao_home-endereco"     element={<AccessControl    tipoPermitido="recepcao"><Recepcao_homeEndereco /> </AccessControl>} />
            <Route path="/Recepcao_cad-usuario"       element={<AccessControl    tipoPermitido="recepcao"><Recepcao_cadUsuario />   </AccessControl>} />
            <Route path="/Recepcao_alt-usuario"       element={<AccessControl    tipoPermitido="recepcao"><Recepcao_altUsuario />   </AccessControl>} />
            <Route path="/Recepcao_hist-consultas"    element={<AccessControl    tipoPermitido="recepcao"><Recepcao_histConsultas/> </AccessControl>} />
            <Route path="/Recepcao_perfil"            element={<AccessControl    tipoPermitido="recepcao"><Recepcao_perfil />       </AccessControl>} />
            <Route path="/Recepcao_dashboards"        element={<AccessControl    tipoPermitido="recepcao"><Recepcao_dashboards />   </AccessControl>} />
            
            {/* Rotas: Paciente */}
            <Route path="/Paciente_home"              element={<AccessControl    tipoPermitido="paciente"><Paciente_home />         </AccessControl>} />
            <Route path="/Paciente_alt-usuario"       element={<AccessControl    tipoPermitido="paciente"><Paciente_altUsuario />   </AccessControl>} />
            <Route path="/Paciente_hist-consultas"    element={<AccessControl    tipoPermitido="paciente"><Paciente_histConsultas/> </AccessControl>} />
            <Route path="/Paciente_perfil"            element={<AccessControl    tipoPermitido="paciente"><Paciente_perfil />       </AccessControl>} />
            <Route path="/Paciente_dashboards"        element={<AccessControl    tipoPermitido="paciente"><Paciente_dashboards />   </AccessControl>} />

         </Routes>
         <ToastContainer/>
      </Router>
   );
}



export default App