
import "./Paciente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_paciente/"
import ButtonBack from "../../components/ButtonBack/Index"
import PageWIP from "../../components/PageWIP/Index"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import UserManagerIcon from '../../components/Sidenav/iconsSideBar/UserManagerIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import api from '../../services/api';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

function Paciente_perfil() {
   const [formDados, setFormDados] = useState({
      nome: '',
      nome_social: '',
      cpf: '',
      sus: '',
      data_nascimento: '',
      genero: '',
      etnia: '',
      estado_civil: '',
      nacionalidade: '',
      naturalidade_estado: '',
      naturalidade_municipio: '',
      filiacao_mae: '',
      filiacao_pai: '',
      num_telefone: '',
      email: '',
      profissao: '',
      escolaridade: '',
      nome_instituicao: '',
      tipo_instituicao: '',
      estado_clinico: '',
      responsavel_legal: '',
      leitura: '',
      escrita: '',
      endereco: '',
      
      cbo: '',
      cbo_descricao: '',
      
      cep: '',
      ponto_referencia: '',
      numero: '',
      complemento: '',
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
      
      createdAt: ''
   });

   useEffect(() => {
      async function buscarDados() {
         try {
            const { data } = await api.get('/paciente/me');
            setFormDados(data.response);
            console.log(`Data.response:`, data.response)
         } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
         }
      };
      buscarDados();
   }, []);
   
   const navigate = useNavigate();

   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '' }]} />
         <NavBar items={[
            { label: 'Home', href: '/paciente_home', icon: HomeAddress },
            { label: 'Perfil', href: '/Paciente_perfil', icon: UserManagerIcon },
            { label: 'Consultas', href: '/Paciente_hist-consultas', icon: query },
            { label: 'Dash', href: '/Paciente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-pages">
            <div className="content-pages-paciente d-block">
               <div className="title-pages">
                  <svg onClick={() => navigate(-1)} style={{ cursor:"pointer" }} className="align-self-start"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#000000"></path> </g></svg>
                  <h1 className="align-self-center h2 px-5">Meu Perfil</h1>
               </div>
               {/* <ButtonBack text="Meu Perfil"/> */}

               <div>
                  <div>
                     <span className="h4 text-success">Registro</span>
                  </div>

                  <div className="form-fields">
                     <Form.Label>Nome</Form.Label>
                     <Form.Control disabled className="disable_input" name="nome" value={formDados.nome} type='text' placeholder='Insira o nome completo'/>
                     
                     <Form.Label>Nome Social</Form.Label>
                     <Form.Control name="nome_social" value={formDados.nome_social || "Não possui/Não informado"} disabled={!formDados.nome_social} type='text' placeholder='Nome Social'/>  
                  </div>

                  <div className="form-fields">
                     <Form.Label>Nome da mãe</Form.Label>
                     <Form.Control disabled className="disable_input" name="filiacao_mae" value={formDados.filiacao_mae} type='text' placeholder='Nome da mãe'/>

                     <Form.Label>Nome do pai</Form.Label>
                     <Form.Control disabled className="disable_input" name="filiacao_pai" value={formDados.filiacao_pai} type='text' placeholder='Nome do pai'/>
                  </div>
                  
                  <div className="form-fields">
                     <Form.Label>CPF</Form.Label>
                     <Form.Control disabled className="disable_input" name="cpf" value={formDados.cpf} type='number' placeholder='CPF'/>
                     
                     <Form.Label>Nº SUS</Form.Label>
                     <Form.Control disabled className="disable_input" name="sus" value={formDados.sus} type='number' placeholder='Nº SUS'/>

                     <Form.Label>Data de Nascimento</Form.Label>
                     <Form.Control disabled className="disable_input" name="data_nascimento" value={formDados.data_nascimento} type='date' placeholder='Data de Nascimento'/>
                  </div>

                  <div className="form-fields" id='dropDown-A'>
                     <Form.Label>Gênero</Form.Label>
                     <Form.Control name="genero" value={formDados.genero} placeholder='Gênero'/>

                     <Form.Label>Etnia</Form.Label>
                     <Form.Control name="etnia" value={formDados.etnia} placeholder='Etnia'/>

                     <Form.Label>Estado Civil</Form.Label>
                     <Form.Control name="estado_civil" value={formDados.estado_civil} placeholder='Estado Civil'/>
                  </div>
               </div>

                        <br/><hr/><br/>

               <div>
                  <div>
                     <span className="h4 text-success">Contatos</span>
                  </div>

                  <div className="form-fields">
                     <Form.Label>Telefone</Form.Label>
                     <Form.Control name="num_telefone" value={formDados.num_telefone} type='number' placeholder='Telefone'/>
                                          
                     <Form.Label>E-mail</Form.Label>
                     <Form.Control name="email" value={formDados.email} type='email' placeholder='E-mail'/>
                  </div>

                  <div className="form-fields">                           
                     <Form.Label>Nacionalidade</Form.Label> 
                     <Form.Control disabled name="nacionalidade" value={formDados.nacionalidade} placeholder='Nacionalidade'/>
      
                     <Form.Label>Naturalidade</Form.Label>
                     <Form.Control name="naturalidade_estado" value={formDados.naturalidade_estado} placeholder='Estado' className="compact-input"/>
                     <Form.Control name="naturalidade_municipio" value={formDados.naturalidade_municipio} type='text' placeholder='Municipio'/>
                  </div>
               </div>
                     
                        <br/><hr/><br/>

               <div>
                  <div>
                     <span className="h4 text-success">Endereço atual</span>
                  </div>

                  <div className="form-fields"> {/* Cadastro do Endereço */}
                     <Form.Label>CEP</Form.Label>
                     <Form.Control value={formDados.endereco.cep} type='text' placeholder='CEP'/>

                     <Form.Label>Logradouro</Form.Label>
                     <Form.Control value={formDados.endereco.logradouro} type='text' placeholder='Logradouro'/>
                     
                     <Form.Label>Número</Form.Label>
                     <Form.Control name="numero" value={formDados.endereco.numero} type='text' placeholder='Número' className="compact-input"/>
                  </div>

                  <div className="form-fields">
                     <Form.Label>Complemento</Form.Label>
                     <Form.Control name="complemento" value={formDados.endereco.complemento} type='text' placeholder='Complemento'/>

                     <Form.Label>Ponto de Referência</Form.Label>
                     <Form.Control name="ponto_referencia" value={formDados.endereco.ponto_referencia || "Não possui/Não informado"} disabled={!formDados.endereco.ponto_referencia} type='text' placeholder='Ponto de Referência'/>
                  </div>

                  <div className="form-fields">
                     <Form.Label>Bairro</Form.Label>
                     <Form.Control value={formDados.endereco.bairro} type='text' placeholder='Bairro'/>

                     <Form.Label>Município</Form.Label>
                     <Form.Control value={formDados.endereco.cidade} type='text' placeholder='Município'/>
                     
                     <Form.Label>Estado</Form.Label><br></br>
                     <Form.Control value={formDados.endereco.estado} type='text' placeholder='UF' className="compact-input"/>
                  </div>
               </div>

                        <br/><hr/><br/>

               <div>
                  <span className="h4 text-success">Profissão e Escolaridade</span>
               </div>

                        {/* Revisar os VALUES daqui pra baixo */}
               {/* <div className="form-fields">
                  <Form.Label>Ocupação</Form.Label>
                  <Form.Control name="profissao" value={formDados.profissao} type='text' placeholder='Ocupação'/>
                  
                  <Form.Label>CBO</Form.Label>
                  <Form.Control name="cbo" value={formDados.cbo} type='number' placeholder='Código' className="compact-input"/>
                  <Form.Control name="cbo_descricao" value={formDados.cbo_descricao} type='text' placeholder='Descrição da Atividade'/>
               </div> */}

                <div className="form-fields">
                  <Form.Label>Ocupação</Form.Label>
                  <Form.Control name="cbo_descricao" value={formDados.cbo_descricao} type='text' placeholder='Descrição da Atividade'/>
                  
                  <Form.Label>Código da Atividade</Form.Label>
                  <Form.Control name="cbo" value={formDados.cbo} type='number' placeholder='Código CBO' className="compact-input"/>
               </div>

               <div className="form-fields">
                  <Form.Label>Escolaridade</Form.Label>
                  <Form.Control name="escolaridade" value={formDados.escolaridade} placeholder='Escolaridade'/>

                  <Form.Label>Nome da Instituição</Form.Label>
                  <Form.Control name="nome_instituicao" value={formDados.nome_instituicao} type='text' placeholder='Nome da Instituição de Ensino'/>
                  
                  <Form.Label>Tipo de Instituição</Form.Label>
                  <Form.Control name="tipo_instituicao" value={formDados.tipo_instituicao} placeholder='Tipo de Instituição'/>
               </div>

               <div className="form-fields">
                  <Form.Label>Estado Clínico</Form.Label>
                  <Form.Control name="estado_clinico" value={formDados.estado_clinico} placeholder='Estado Clínico'/>

                  <Form.Label>Responsável Legal</Form.Label>
                  <Form.Control name="responsavel_legal" value={formDados.responsavel_legal} type='text' placeholder='Responsável Legal'/>
                  
                  <div className="form-fields">
                     Sabe ler? <Form.Check value={formDados.leitura} type="switch" />
                  </div>

                  <div className="form-fields">
                     Sabe escrever? <Form.Check value={formDados.escrita} type="switch" />
                  </div>
               </div>

                        <br/><hr/><br/>

               <div>
                  <span className="h4 text-success">Informações sobre o cadastro</span>
               </div>

               <div className="form-fields">
                  <Form.Label>Cadastrado por</Form.Label>
                  <Form.Control disabled name="escolaridade" value={""} placeholder=''/>

                  <Form.Label>Data e Hora</Form.Label>
                  <Form.Control disabled name="createdAt" value={new Date(formDados.createdAt).toLocaleString('pt-BR')} type='text' placeholder='Data e Hora de criação'/>
               </div>

               {/* Botões pra voltar e alterar cadastro*/}
               <div className="form-button">
                  <button className="btn btn-light border-dark border-opacity-75 px-4 py-2" onClick={() => {navigate('/Admin_home')}}>Voltar pra tela inicial</button>
                  <button form="form-registro" className="btn btn-light border-dark border-opacity-75 px-4 py-2">Alterar Cadastro</button>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Paciente_perfil;