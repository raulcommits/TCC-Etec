import "./Paciente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_paciente/"
import { Link } from "react-router-dom";
import ButtonBack from "../../components/ButtonBack/Index"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import { useEffect, useState } from 'react';
import api from '../../services/api';
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';

function Paciente_dashboards() {
   const [usuario, setUsuario] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [paciente, setPaciente] = useState(null);

   useEffect(() => {
      let mounted = true;
      const fetchUser = async () => {
         try {
            const res = await api.get('/login/me');
            if (mounted) setUsuario(res.data);
         } catch (err) {
            console.error('Erro ao buscar usuário:', err);
            if (mounted) setError('Não foi possível carregar dados do usuário.');
         } finally {
            if (mounted) setLoading(false);
         }
      }

      const fetchPacientePerfil = async () => {
         try {
            const res = await api.get('/paciente/perfil');
            if (mounted) setPaciente(res.data.response || res.data);
         } catch (err) {
            console.error('Erro ao buscar perfil do paciente:', err);
         }
      }

      fetchUser();
      fetchPacientePerfil();
      return () => { mounted = false };
   }, []);

   // placeholder avatar (mesma imagem do Header)
   const avatar = '/placeholder.png';

   // dados exibidos a partir do perfil do paciente
   const pacienteData = paciente || {};
   function calcularIdade(dNasc) {
      if (!dNasc) return null;
      const nasceu = new Date(dNasc);
      const diff = Date.now() - nasceu.getTime();
      const idade = new Date(diff).getUTCFullYear() - 1970;
      return idade;
   }

      function exportDashboardToPDF() {
         const el = document.getElementById('dashboard-printable');
         if (!el) return alert('Não foi possível encontrar o conteúdo para exportar.');

         const newWin = window.open('', '_blank', 'width=1000,height=800');
         const styles = `
            body{font-family: Arial, Helvetica, sans-serif; padding:20px;}
            .card{width:100%; box-sizing: border-box}
         `;
         newWin.document.write(`<!doctype html><html><head><title>Dashboard - Informações</title><style>${styles}</style></head><body>${el.innerHTML}</body></html>`);
         newWin.document.close();
         newWin.focus();
         setTimeout(() => { newWin.print(); }, 600);
      }

   // Dashboard simplificado: apenas dados cadastrais básicos

   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />}
         items={[
            { label: 'Home', href: '/Paciente_home' },
            { label: 'Dashboards', href: '/Paciente_dashboards' }]} />
         <NavBar items={[
            { label: 'Home', href: '/paciente_home', icon: HomeAddress },
            { label: 'Perfil', href: '/Paciente_perfil', icon: UserManagerIcon },
            { label: 'Consultas', href: '/Paciente_hist-consultas', icon: query },
            { label: 'Dash', href: '/Paciente_dashboards', icon: dashIcon }
         ]} />

         <main className="content-home" style={{position: "relative", padding: 20}}>
            <Link to="/Paciente_home" className="backButton">
               <ButtonBack />
            </Link>

            <div className="title_Home" style={{marginBottom: 16}}>
               <h1><b>Dashboard</b></h1>
               <p style={{margin: 0, color: '#666'}}>Visão geral da sua conta e últimas informações</p>
            </div>

            {loading && <div>Carregando informações...</div>}
            {error && <div style={{color: 'red'}}>{error}</div>}

            <div id="dashboard-printable">
            {!loading && usuario && (
               <>
               <div style={{display: 'flex', justifyContent: 'center'}}>
                  <div style={{width: 640, background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,.08)'}}>
                     <h2 style={{marginTop: 0}}>Informações Básicas</h2>
                     <p style={{margin: '6px 0'}}><strong>Nome:</strong> {pacienteData.nome || usuario.nome}</p>
                     {pacienteData.nome_social && <p style={{margin: '6px 0'}}><strong>Nome social:</strong> {pacienteData.nome_social}</p>}
                     <p style={{margin: '6px 0'}}><strong>E-mail:</strong> {pacienteData.email || usuario.email}</p>
                     <p style={{margin: '6px 0'}}><strong>CPF:</strong> {pacienteData.cpf || usuario.cpf}</p>
                     {pacienteData.num_telefone && <p style={{margin: '6px 0'}}><strong>Telefone:</strong> {pacienteData.num_telefone}</p>}
                     {pacienteData.data_nascimento && <p style={{margin: '6px 0'}}><strong>Data de Nascimento:</strong> {new Date(pacienteData.data_nascimento).toLocaleDateString()}</p>}
                     {pacienteData.sus && <p style={{margin: '6px 0'}}><strong>SUS:</strong> {pacienteData.sus}</p>}
                  </div>
               </div>
               <div style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>
                  <button className="exportBtn" onClick={() => exportDashboardToPDF()}>
                     Exportar PDF
                  </button>
               </div>
               </>
            )}
            </div>

         </main>
      </div>
   )
}

export default Paciente_dashboards;