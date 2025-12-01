import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import ButtonBack from "../../components/ButtonBack/Index"
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import AddUserMale from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { GoReply } from "react-icons/go";


function Agente_dashboards() {
   const navigate = useNavigate();

   const [patients, setPatients] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      let mounted = true;
      async function load() {
         try {
            const res = await api.get('/paciente');
            if (!mounted) return;
            setPatients(Array.isArray(res.data) ? res.data : []);
         } catch (err) {
            console.error('Erro ao buscar pacientes:', err);
            setPatients([]);
         } finally {
            if (mounted) setLoading(false);
         }
      }
      load();
      return () => { mounted = false };
   }, []);

   const totalPatients = patients.length;

   const illnessCounts = patients.reduce((acc, p) => {
      const key = (p.estado_clinico || 'Não informado').trim() || 'Não informado';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
   }, {});

   const topIllnesses = Object.entries(illnessCounts)
      .sort((a,b) => b[1] - a[1])
      .slice(0,4);

   // Observação: campo de vacinação removido — não mais exibido neste dashboard

   const escolaridadeCounts = patients.reduce((acc, p) => {
      const key = (p.escolaridade || 'Não informado').trim() || 'Não informado';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
   }, {});

   const escolaridadeList = Object.entries(escolaridadeCounts).sort((a,b) => b[1] - a[1]);

   function exportDashboardToPDF() {
      const el = document.getElementById('agente-dashboard');
      if (!el) return window.print();
      const win = window.open('', '_blank');
      win.document.write(`<!doctype html><html><head><title>Dashboard Agente</title>`);
      // copiar estilos mínimos
      const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(n => n.outerHTML).join('\n');
      win.document.write(styles);
      win.document.write('</head><body>');
      win.document.write(el.innerHTML);
      win.document.write('</body></html>');
      win.document.close();
      win.focus();
      setTimeout(() => { win.print(); win.close(); }, 500);
   }

   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />}
                  items={[
                     { label: 'Home', href: '/Agente_home' },
                     { label: 'Dashboards', href: '/Agente_dashboards' }
                     ]} />
         <NavBar items={[
            { label: 'Home', href: '/agente_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Agente_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Agente_hist-visitas', icon: query },
            { label: 'Dash', href: '/Agente_dashboards', icon: dashIcon }
         ]} />

         <main className="content-home" style={{position: "relative"}}>

            <div className="title-pages">
               <GoReply onClick={() => navigate(-1)}/>
               <h1 className="align-self-center h2 px-5">Dashboards</h1>
            </div>

            <div id="agente-dashboard" className="dashboard-grid-container">
               <div className="card small">
                  <h3>Total de pacientes</h3>
                  <p className="big-number">{loading ? '...' : totalPatients}</p>
               </div>

               <div className="card">
                  <h3>Principais enfermidades (top 4)</h3>
                  {loading ? <p>Carregando...</p> : (
                     topIllnesses.length ? (
                        <div className="chart-vertical">
                           {topIllnesses.map(([name, count], idx) => {
                              const percent = totalPatients ? Math.round((count/totalPatients)*100) : 0;
                              return (
                                 <div className="chart-row" key={idx}>
                                    <div className="chart-label">{name}</div>
                                    <div className="chart-bar-outer">
                                       <div className="chart-bar-inner" style={{width: `${percent}%`}} />
                                    </div>
                                    <div className="chart-value">{count} ({percent}%)</div>
                                 </div>
                              )
                           })}
                        </div>
                     ) : <p>Nenhuma informação</p>
                  )}
               </div>

               {/* Bloco de Vacinação removido conforme solicitado */}

               <div className="card">
                  <h3>Escolaridade</h3>
                  {loading ? <p>Carregando...</p> : (
                     escolaridadeList.length ? (
                        <div className="chart-horizontal">
                           {escolaridadeList.map(([name, count], idx) => {
                              const percent = totalPatients ? Math.round((count/totalPatients)*100) : 0;
                              return (
                                 <div className="chart-row-h" key={idx}>
                                    <div className="chart-label-h">{name}</div>
                                    <div className="chart-bar-outer-h">
                                       <div className="chart-bar-inner-h" style={{width: `${percent}%`}} />
                                    </div>
                                    <div className="chart-value-h">{percent}%</div>
                                 </div>
                              )
                           })}
                        </div>
                     ) : <p>Nenhuma informação</p>
                  )}
               </div>
            </div>

            <div style={{marginTop: 12}}>
               <button className="exportBtn" onClick={exportDashboardToPDF}>Exportar PDF</button>
            </div>

         </main>
      </div>
   )
}

export default Agente_dashboards;