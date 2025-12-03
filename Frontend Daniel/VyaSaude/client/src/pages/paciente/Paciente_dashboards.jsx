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
   import SmallBarChart from '../../components/SmallBarChart/SmallBarChart.jsx';

   function Paciente_dashboards() {
      const [usuario, setUsuario] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [paciente, setPaciente] = useState(null);
      const [enderecoDetails, setEnderecoDetails] = useState(null);
      const [lastVisit, setLastVisit] = useState(null);
      const [enderecoLoading, setEnderecoLoading] = useState(false);
      const [enderecoRecords, setEnderecoRecords] = useState([]);
      const [visitsPeriod, setVisitsPeriod] = useState('month'); // 'week' | 'month' | 'year'

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

      useEffect(() => {
         let mounted = true;
         async function loadEndereco() {
            if (!paciente) return;
            const enderecoId = paciente.enderecoId || paciente.endereco?.id || paciente.enderecoId;
            if (!enderecoId) return;
            setEnderecoLoading(true);
            try {
               // tenta buscar detalhes do endereço
               const res = await api.get(`/endereco/${enderecoId}`);
               if (!mounted) return;
               setEnderecoDetails(res.data || res.data.response || null);

               // tenta buscar últimos registros/visitas relacionados ao endereço
               try {
                  const regRes = await api.get('/registro');
                  if (!mounted) return;
                  const registros = Array.isArray(regRes.data) ? regRes.data : (regRes.data.response || []);
                  const relacionados = registros.filter(r => {
                     return r.enderecoId === enderecoId || r.endereco_id === enderecoId || r.endereco?.id === enderecoId || r.pacienteId === paciente.id || r.paciente_id === paciente.id;
                  });
                  if (relacionados.length) {
                     const ordenado = relacionados.sort((a,b) => new Date(b.data_visita || b.createdAt || b.data || b.date) - new Date(a.data_visita || a.createdAt || a.data || a.date));
                     setLastVisit(ordenado[0]);
                     setEnderecoRecords(ordenado);
                  } else {
                     setEnderecoRecords([]);
                  }
               } catch (err) {
                  // falha ao buscar registros; silenciar (backend pode não expor)
                  console.debug('Não foi possível buscar registros para última visita', err);
               }
            } catch (err) {
               console.debug('Não foi possível buscar detalhes do endereço', err);
            } finally {
               if (mounted) setEnderecoLoading(false);
            }
         }
         loadEndereco();
         return () => { mounted = false };
      }, [paciente]);

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

            // Copiar links e styles da página para preservar aparência
            const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(n => n.outerHTML).join('\n');

            const printCSS = `
               <style>
                  @page { size: auto; margin: 20mm; }
                  body { font-family: Arial, Helvetica, sans-serif; background: #fff; color: #111; }
                  .print-container { max-width: 900px; margin: 0 auto; }
                  .logo-print { display:block; margin: 10px auto 18px auto; width: 160px; }
                  .boxSimpleInfos { box-shadow: none; border-radius: 8px; }
               </style>
            `;

            // Inserir logo centralizada no topo (public/Logo.png)
            const logoHtml = `<img src="/Logo.png" class="logo-print" alt="Logo"/>`;

            newWin.document.write(`<!doctype html><html><head><title>Dashboard - Informações</title>${styles}${printCSS}</head><body><div class="print-container">${logoHtml}${el.innerHTML}</div></body></html>`);
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
                  <h1><b>Relatórios (Dashboards)</b></h1>
                  <p style={{margin: 0, color: '#666'}}>Visão geral da sua conta e últimas informações</p>
               </div>

               {loading && <div>Carregando informações...</div>}
               {error && <div style={{color: 'red'}}>{error}</div>}

               <div id="dashboard-printable">
               {!loading && usuario && (
                  <>
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                     <div style={{width: 760, background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,.08)'}}>
                        <h2 style={{marginTop: 0}}>Informações Básicas</h2>

                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
                           <div>
                              <p style={{margin: '6px 0'}}><strong>Nome:</strong> {pacienteData.nome || usuario.nome}</p>
                              {pacienteData.nome_social && <p style={{margin: '6px 0'}}><strong>Nome social:</strong> {pacienteData.nome_social}</p>}
                              <p style={{margin: '6px 0'}}><strong>E-mail:</strong> {pacienteData.email || usuario.email}</p>
                              <p style={{margin: '6px 0'}}><strong>CPF:</strong> {pacienteData.cpf || usuario.cpf}</p>
                              {pacienteData.num_telefone && <p style={{margin: '6px 0'}}><strong>Telefone:</strong> {pacienteData.num_telefone}</p>}
                           </div>

                           {/* <div>
                              {pacienteData.data_nascimento && (<p style={{margin: '6px 0'}}><strong>Data de Nascimento:</strong> {new Date(pacienteData.data_nascimento).toLocaleDateString()} <span style={{color:'#666'}}>({calcularIdade(pacienteData.data_nascimento)} anos)</span></p>)}
                              {pacienteData.sus && <p style={{margin: '6px 0'}}><strong>SUS:</strong> {pacienteData.sus}</p>}
                              {pacienteData.genero && <p style={{margin: '6px 0'}}><strong>Gênero:</strong> {pacienteData.genero}</p>}
                              {pacienteData.etnia && <p style={{margin: '6px 0'}}><strong>Etnia:</strong> {pacienteData.etnia}</p>}
                           </div> */}
                        </div>

                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
                           {/* <div>
                              {pacienteData.escolaridade && <p style={{margin: '6px 0'}}><strong>Escolaridade:</strong> {pacienteData.escolaridade}</p>}
                              {pacienteData.profissao && <p style={{margin: '6px 0'}}><strong>Profissão:</strong> {pacienteData.profissao}</p>}
                              {pacienteData.estado_clinico && <p style={{margin: '6px 0'}}><strong>Estado Clínico:</strong> {pacienteData.estado_clinico}</p>}
                           </div> */}

                           <div>
                              {/* Endereço: tenta componentes comuns, senão mostra placeholders */}
                              <p style={{margin: '6px 0'}}><strong>Endereço:</strong> {(
                                 pacienteData.logradouro || pacienteData.bairro || pacienteData.cidade || pacienteData.estado
                              ) ? `${pacienteData.logradouro || ''} ${pacienteData.numero || ''} - ${pacienteData.bairro || ''} ${pacienteData.cidade || ''} ${pacienteData.estado || ''}` : '—'}</p>

                              {pacienteData.responsavel_legal && <p style={{margin: '6px 0'}}><strong>Responsável legal:</strong> {pacienteData.responsavel_legal}</p>}
                              <p style={{margin: '6px 0'}}><strong>Leitura / Escrita:</strong> { (pacienteData.leitura ? 'Sim' : 'Não') } / { (pacienteData.escrita ? 'Sim' : 'Não') }</p>
                           </div>
                        </div>
                        {/* Boxes de destaque (última visita, moradores, estado clínico) */}
                        <div style={{display:'flex', gap:12, marginTop:12, flexWrap:'wrap', alignItems:'center', height: 160}}>
                           <div className="boxSimpleInfos" style={{width:230, height: '100%'}}>
                              <div className="headerLine">
                                 <h5><b>Última visita</b></h5>
                                 <img src={query} className="headerImage" />
                              </div>
                              <div className="mainLine" style={{padding:12}}>
                                 {(() => {
                                    const start = (() => {
                                       const now = new Date();
                                       if (visitsPeriod === 'week') return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0,0,0);
                                       if (visitsPeriod === 'month') return new Date(now.getFullYear(), now.getMonth() - 5, 1, 0,0,0);
                                       return new Date(now.getFullYear() - 1, now.getMonth(), 1, 0,0,0);
                                    })();
                                    const filtered = enderecoRecords.filter(r => {
                                       const d = new Date(r.data_visita || r.createdAt || r.data || r.date);
                                       return !isNaN(d) && d >= start;
                                    }).sort((a,b) => new Date(b.data_visita || b.createdAt || b.data || b.date) - new Date(a.data_visita || a.createdAt || a.data || a.date));
                                    const recent = filtered[0];
                                    return recent ? (
                                       <div>
                                          <div style={{fontSize:18, fontWeight:700}}>{new Date(recent.data_visita || recent.createdAt || recent.data || recent.date).toLocaleString()}</div>
                                          {recent.descricao && <div style={{color:'#666', marginTop:6}}>{recent.descricao}</div>}
                                       </div>
                                    ) : (
                                       <div style={{fontSize:18, fontWeight:700}}>Nenhuma</div>
                                    )
                                 })()}
                              </div>
                           </div>

                           <div className="boxSimpleInfos" style={{width:230, height: '100%'}}>
                              <div className="headerLine">
                                 <h5><b>Moradores</b></h5>
                                 <img src={HomeAddress} className="headerImage" />
                              </div>
                              <div className="mainLine" style={{padding:12}}>
                                 <div style={{fontSize:22, fontWeight:800}}>{(enderecoDetails?.quantidade_moradores || enderecoDetails?.moradores_count || enderecoDetails?.num_moradores) || '—'}</div>
                                 <div style={{color:'#666', marginTop:6}}>Quantidade de moradores no endereço</div>
                              </div>
                           </div>

                           <div className="boxSimpleInfos" style={{width:230, height: '100%'}}>
                              <div className="headerLine">
                                 <h5><b>Estado Clínico</b></h5>
                                 <img src={UserManagerIcon} className="headerImage" />
                              </div>
                              <div className="mainLine" style={{padding:12}}>
                                 <div style={{fontSize:20, fontWeight:800}}>{pacienteData.estado_clinico || '—'}</div>
                                 <div style={{color:'#666', marginTop:6}}>Último estado cadastrado</div>
                              </div>
                           </div>
                        </div>

                        <hr style={{margin: '10px 0'}} />

                        {pacienteData.agente && (
                           <>
                              <hr style={{margin: '10px 0'}} />
                              <div>
                                 <h4 style={{marginBottom: 6}}>Agente responsável</h4>
                                 <p style={{margin: '4px 0'}}><strong>Nome:</strong> {pacienteData.agente.nome || '—'}</p>
                                 {pacienteData.agente.num_telefone && <p style={{margin: '4px 0'}}><strong>Contato:</strong> {pacienteData.agente.num_telefone}</p>}
                              </div>
                           </>
                        )}
                        {/* Box com informações do endereço */}
                        <div style={{marginTop: 12, borderTop: '1px solid #eee', paddingTop: 12}}>
                           <h3 style={{margin: '6px 0'}}>Informações do Endereço</h3>
                                 {enderecoLoading && <p>Carregando endereço...</p>}
                           {!enderecoLoading && (
                              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
                                 <div>
                                    <p style={{margin: '6px 0'}}><strong>Quantidade de moradores:</strong> {(
                                       enderecoDetails?.quantidade_moradores || enderecoDetails?.moradores || enderecoDetails?.moradores_count || enderecoDetails?.num_moradores || '—'
                                    )}</p>

                                    <p style={{margin: '6px 0'}}><strong>Descrição:</strong> {(
                                       enderecoDetails?.descricao || enderecoDetails?.observacoes || enderecoDetails?.descricao_endereco || '—'
                                    )}</p>
                                 </div>

                                 <div>
                                    <p style={{margin: '6px 0'}}><strong>Última visita:</strong> {'—'}</p>
                                 </div>
                              </div>
                           )}
                        </div>

                           {/* Gráfico de barras: Visitas por mês (últimos 6 meses) usando Chart.js */}
                           <div style={{marginTop:16}}>
                              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                 <h4 style={{marginBottom:8}}>Visitas ({visitsPeriod === 'week' ? 'última semana' : visitsPeriod === 'month' ? 'últimos 6 meses' : 'último ano'})</h4>
                                 <div style={{display:'flex', gap:8, alignItems:'center'}}>
                                    <span style={{fontSize:12, color:'#666', marginRight:6}}>Período:</span>
                                    <button onClick={() => setVisitsPeriod('week')} className={visitsPeriod==='week' ? 'periodBtn active' : 'periodBtn'}>Última semana</button>
                                    <button onClick={() => setVisitsPeriod('month')} className={visitsPeriod==='month' ? 'periodBtn active' : 'periodBtn'}>Último mês</button>
                                    <button onClick={() => setVisitsPeriod('year')} className={visitsPeriod==='year' ? 'periodBtn active' : 'periodBtn'}>Último ano</button>
                                 </div>
                              </div>
                              {enderecoRecords.length === 0 ? (
                                 <p style={{color:'#666'}}>Sem registros de visitas para exibir.</p>
                              ) : (
                                 (() => {
                                    const now = new Date();
                                    if (visitsPeriod === 'week') {
                                       const days = [];
                                       for (let i = 6; i >= 0; i--) {
                                          const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
                                          const label = d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit' });
                                          const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
                                          days.push({ key, label, count: 0, date: d });
                                       }
                                       enderecoRecords.forEach(r => {
                                          const d = new Date(r.data_visita || r.createdAt || r.data || r.date);
                                          if (isNaN(d)) return;
                                          const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
                                          const m = days.find(x => x.key === key);
                                          if (m) m.count++;
                                       });
                                       const labels = days.map(d => d.label);
                                       const counts = days.map(d => d.count);
                                       return <SmallBarChart labels={labels} data={counts} />;
                                    } else {
                                       const months = [];
                                       const monthsCount = visitsPeriod === 'month' ? 6 : 12;
                                       for (let i = monthsCount - 1; i >= 0; i--) {
                                          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                                          const label = d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
                                          months.push({ key: `${d.getFullYear()}-${d.getMonth()+1}`, label, count: 0 });
                                       }
                                       enderecoRecords.forEach(r => {
                                          const d = new Date(r.data_visita || r.createdAt || r.data || r.date);
                                          if (isNaN(d)) return;
                                          const key = `${d.getFullYear()}-${d.getMonth()+1}`;
                                          const m = months.find(x => x.key === key);
                                          if (m) m.count++;
                                       });
                                       const labels = months.map(m => m.label);
                                       const counts = months.map(m => m.count);
                                       return <SmallBarChart labels={labels} data={counts} />;
                                    }
                                 })()
                              )}
                           </div>
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