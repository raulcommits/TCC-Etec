
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
import { getUser } from "../../helpers/auth"
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { TextField } from '@mui/material'
import { PatternFormat } from "react-number-format";
import { Button } from 'react-bootstrap';


function Paciente_perfil() {
   const navigate = useNavigate();

   const [usuario, setUsuario] = useState(undefined);
   const [modoEdicao, setModoEdicao] = useState(false);

   const [dadosPaciente, setDadosPaciente] = useState({
      id: '',
      cpf: '',
      nome: '',
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
      telefone: '',
      email: '',
      profissao: '',
      escolaridade: '',
      nome_instituicao: '',
      tipo_instituicao: '',
      estado_clinico: '',
      responsavel_legal: '',
      leitura: '',
      escrita: '',    
      enderecoId: '',
   });

   
   const [dadosEndereco, setDadosEndereco] = useState({
      enderecoId: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: '',
      ponto_referencia: '',
      tipo_animal: { nome_animal: '' },
      tipo_imovel: { nome_imovel: '' },
      material_predominante: { nome_material: '' }
   });

   useEffect(() => {
      const response = getUser();
      setUsuario(response);
   }, []);


   useEffect(() => {
      async function buscarDados() {
         try {
            // Chama a rota que acabamos de criar. O Token vai no Header automaticamente (pelo axios/interceptor)
            const { data } = await api.get('/paciente/perfil');
            
            // O backend retorna { response: { ...dados } }
            const pacienteData = data.response;

            if (pacienteData) {
               console.log("Paciente carregado:", pacienteData);
               
               // Atualiza estado do Paciente
               setDadosPaciente(pacienteData);

               // Atualiza estado do Endereço (se existir)
               if (pacienteData.endereco) {
                  setDadosEndereco(pacienteData.endereco);
               }
            }

         } catch (error) {
            console.error('Erro ao buscar dados:', error);
            if (error.response?.status === 403 || error.response?.status === 401) {
               alert("Sessão expirada ou inválida.");
               navigate('/'); // Redireciona para login
            }
         }
      };
      buscarDados();
   }, []);


   useEffect(() => {
      console.log("dadosPaciente", dadosPaciente);
   }, [dadosPaciente]);
   

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
            <div className="content-pages-paciente ">
               <div className="content-paciente_perfil">
                  <div className="title-pages">
                     <svg onClick={() => navigate(-1)} style={{ cursor:"pointer" }} className="align-self-start"
                     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#000000"></path> </g></svg>
                     <h1 className="align-self-center h2 px-5">Meu Perfil</h1>
                  </div>
                  {/* <ButtonBack text="Meu Perfil"/> */}

                  <div className="elements-paciente_perfil">
                     <span className="subtitulo h5 text-success">Dados de Registro do Paciente</span>
                     <div className="grid grid_1">
                        <TextField  name="nome" label="Nome do Paciente" variant="outlined" value={dadosPaciente.nome} />
                        <TextField  name="nome_social" label="Nome Social" variant="outlined" value={dadosPaciente.nome_social ? dadosPaciente.nome_social : "Não possui"} />
                     </div>

                     <div className="grid grid_1">
                        <PatternFormat  name="cpf" label="CPF do Paciente" variant="outlined" format="###.###.###-##" mask=" " customInput={TextField} value={dadosPaciente.cpf} />
                        <PatternFormat  name="sus" label="Nº SUS" variant="outlined" format="### #### #### ###" mask=" " customInput={TextField} value={dadosPaciente.sus} />
                     </div>

                     <div className="grid grid_1">
                        <TextField  name="filiacao_mae" label="Nome da mãe" variant="outlined" value={dadosPaciente.filiacao_mae} />
                        <TextField  name="filiacao_pai" label="Nome do pai" variant="outlined" value={dadosPaciente.filiacao_pai} />
                     </div>

                     <div className="grid grid_2">
                        <TextField  name="data_nascimento" label="Data de Nascimento" variant="outlined"  value={new Date(dadosPaciente.data_nascimento).toLocaleDateString('pt-BR')} />
                        <TextField  name="genero" label="Gênero" variant="outlined" value={dadosPaciente.genero} />
                        <TextField  name="etnia" label="Etnia" variant="outlined" value={dadosPaciente.etnia} />
                     </div>

                     <div className="grid grid_2">
                        <TextField  name="nacionalidade" label="Nacionalidade" variant="outlined" value={dadosPaciente.nacionalidade} />
                        <TextField  name="naturalidade_estado" label="Naturalidade (Estado)" variant="outlined" value={dadosPaciente.naturalidade_estado} />
                        <TextField  name="naturalidade_municipio" label="Naturalidade (Municipio)" variant="outlined"  value={dadosPaciente.naturalidade_municipio} />
                     </div>

                     <hr/>

                     <span className="subtitulo h5 text-success">Dados pessoais</span>
                     <div className="grid grid_1">
                        <TextField  name="responsavel_legal" label="Responsável Legal" variant="outlined" value={dadosPaciente.responsavel_legal ? dadosPaciente.responsavel_legal : "Não aplicável"} />
                        <TextField  name="profissao" label="Profissão" variant="outlined" value={dadosPaciente.profissao ? dadosPaciente.profissao : "Desempregado"} />
                        <TextField  name="estado_clinico" label="Estado Clínico" variant="outlined" value={dadosPaciente.estado_clinico} />
                        <TextField  name="estado_civil" label="Estado Cívil" variant="outlined"  value={dadosPaciente.estado_civil} />
                     </div>

                     <hr/>

                     <span className="subtitulo h5 text-success">Alfabetização</span>
                     <div className="grid grid_1">
                        <TextField  name="leitura" label="Saber ler" variant="outlined" value={dadosPaciente.leitura = true ? 'Sim' : 'Não'} />
                        <TextField  name="escrita" label="Saber Escrever" variant="outlined" value={dadosPaciente.escrita = true ? 'Sim' : 'Não'} />
                     </div>

                     <hr/>

                     <span className="subtitulo h5 text-success">Contatos</span>
                     <div className="grid grid_1">
                        <TextField  name="email" label="E-mail" variant="outlined" value={dadosPaciente.email} />
                        <PatternFormat  name="telefone" label="Telefone" variant="outlined" value={dadosPaciente.telefone} format={(dadosPaciente.telefone || "").replace(/\D/g, '').length > 10 ? "(##) # ####-####" : "(##) ####-####"} mask=" " customInput={TextField}/>
                     </div>

                     <div className="grid grid_2">
                        <TextField  name="escolaridade" label="Escolaridade" variant="outlined" value={dadosPaciente.escolaridade} />
                        <TextField  name="nome_instituicao" label="Nome da Instituição" variant="outlined" value={dadosPaciente.nome_instituicao} />
                        <TextField  name="tipo_instituicao" label="Tipo de Instituição" variant="outlined" value={dadosPaciente.tipo_instituicao} />
                     </div>
                     
                     <hr/>

                     <span className="subtitulo h5 text-success">Dados do Endereço</span>
                     <div className="grid grid_2">
                        <TextField  name="bairro" label="Bairro" variant="outlined" value={dadosEndereco.bairro} />
                        <TextField  name="cidade" label="Cidade" variant="outlined" value={dadosEndereco.cidade} />
                        <TextField  name="estado" label="Estado" variant="outlined" value={dadosEndereco.estado} />
                     </div>
                     
                     <div className="grid grid_2">
                        <TextField  name="logradouro" label="Logradouro" variant="outlined"  value={dadosEndereco.logradouro} />
                        <PatternFormat  name="numero" label="Número" value={dadosEndereco.numero} format={(dadosEndereco.numero || "").replace(/\D/g, '').length > 3 ? "#.###" : "###"} mask=" " customInput={TextField} variant="outlined" />
                        <TextField  name="complemento" label="Complemento" variant="outlined" value={dadosEndereco.complemento} />
                        <PatternFormat  name="cep" label="CEP" variant="outlined" format="#####-###" mask=" " customInput={TextField} value={dadosEndereco.cep} />
                        <TextField  name="ponto_referencia" label="Ponto de Referência" variant="outlined" value={dadosEndereco.ponto_referencia ? dadosEndereco.ponto_referencia : "Não possui/Não informado"} />
                        <TextField  name="pais" label="Pais" variant="outlined"  value={dadosEndereco.pais} />
                     </div>

                     <hr/>

                     <span className="subtitulo h5 text-success">Dados da Residencia</span>
                     <div className="grid grid_2">
                        <TextField  name="nome_animal" label="Possui animais" variant="outlined" value={dadosEndereco?.tipo_animal ? "Possui" : "Não possui"} />
                        <TextField  name="nome_imovel" label="Tipo de Imóvel" variant="outlined" value={dadosEndereco?.tipo_imovel?.nome_imovel} />
                        <TextField  name="nome_material" label="Material do Imóvel" variant="outlined" value={dadosEndereco?.material_predominante?.nome_material} />
                     </div>

                     <hr/>

                     <div className="form-buttons">
                        <Button variant="outline-success" onClick={() => {navigate('/Admin_home')}}>Voltar pra tela inicial</Button>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Paciente_perfil;