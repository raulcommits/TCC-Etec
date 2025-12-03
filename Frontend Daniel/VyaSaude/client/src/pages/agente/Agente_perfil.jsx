import "../../App.css"
import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import api from '../../services/api';
import { getUser } from "../../helpers/auth"
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material"
import { Button } from 'react-bootstrap';
import { PatternFormat } from 'react-number-format';

import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import AddUserMale from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';

import { GoReply } from "react-icons/go";

function Agente_perfil() {
   const navigate = useNavigate();

   const [usuario, setUsuario] = useState(undefined);

   const [modoEdicao, setModoEdicao] = useState(false);
   
   const [dados, setDados] = useState({
      nome_agente: '',
      cpf: '',
      email: '',
      telefone: '',
      data_admissao: '',
      posto: {
         nome_posto: ''
      },
      cbo: {
         codigo: '',
         descricao: ''
      },
      createdAt: ''
   });

   const [dadosParaAtualizar, setDadosParaAtualizar] = useState({
      telefone: dados?.telefone
   });

   
   useEffect(() => {
      const response = getUser();
      setUsuario(response);
   }, []);

   
   useEffect(() => {
      async function buscarDados() {
         if (!usuario?.cpf) return;

         try {
            const [dadosAgente, dadosUsuario] = await Promise.all([
               await api.get(`/agente/${usuario?.cpf}`),
               await api.get(`/usuario/${usuario?.cpf}`)
            ]);
            
            console.log("Dados agente: ", dadosAgente.data);
            console.log("Dados usuario: ", dadosUsuario.data.response);

            setDados({
               ...dadosAgente.data,
               createdAt: dadosUsuario.data.response.createdAt
            });

            setDadosParaAtualizar({
               telefone: dadosAgente.data.telefone
            });
         }
         catch (error) {
            console.error(error);
         } 
      }
      buscarDados();
   }, [usuario]);


   async function atualizarDados() {
      if (!usuario?.cpf) return;
      if (modoEdicao === false) return;

      try {
         const telefoneLimpo = dadosParaAtualizar.telefone.replace(/\D/g, '');

         // atualizar o email e telefone no repositorio do usuario e do {agente}
         console.log("dadosParaAtualizar", telefoneLimpo);

         await api.put(`/agente/atualizarAgente/${usuario?.email}`, {telefone: telefoneLimpo})
         .then(res => console.log(res))

         // await api.put(`/usuarioCadastro/${usuario?.cpf}`, dadosParaAtualizar);
         
      }
      catch (error) {
         console.log(error);
      }
   }


   useEffect(() => {
      console.log("modoEdicao", modoEdicao);
   }, [modoEdicao]);


   const handleFormChange = (e) => {
      const {name, value} = e.target;
      
      setDadosParaAtualizar((dados) => ({
         ...dados,
         [name]: value
      }));
   };

   
   return (
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />}
                  items={[
                     { label: 'Home', href: '/Agente_home' },
                     { label: 'Meu Perfil', href: '/Agente_perfil' }
                     ]} />
         <NavBar items={[
            { label: 'Home', href: '/agente_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Agente_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Agente_hist-visitas', icon: query },
            { label: 'Dash', href: '/Agente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-pages">
            <div className="content-pages-agente ">
               <div className="content-agente_perfil">
                  <div className="title-pages">
                     <GoReply onClick={() => {setModoEdicao(false), navigate(-1)}}/>
                     <h1 className="align-self-center h2 px-5">Meu Perfil</h1>
                  </div>
                  {/* <ButtonBack text="Meu Perfil"/> */}

                  <div className="elements-agente_perfil">
                     <span className="h4 text-success">Registro</span>
                     <div className="grid grid_1">
                        <TextField disabled variant="outlined" value={dados.nome_agente} label="Nome completo"/>
                        <PatternFormat disabled name="cpf" label="CPF" value={dados.cpf} format="###.###.###-##" mask=" " customInput={TextField} variant="outlined"/>
                     </div>

                     <div className="grid grid_2">
                        <TextField disabled variant="outlined" value={dados.email} label="E-mail"/>
                        <PatternFormat disabled={!modoEdicao} name="telefone" label="Telefone" value={dados.telefone} onChange={(e) => handleFormChange(e)} format={(dados.telefone || "").replace(/\D/g, '').length > 10 ? "(##) # ####-####" : "(##) ####-####"} mask=" " customInput={TextField} variant="outlined"/>
                        <TextField disabled variant="outlined" value={dados?.posto?.nome_posto} label="Posto de Saúde"/>
                     </div>

                     <hr/>

                     <span className="h4 text-success">Informações sobre o cadastro</span>
                     <div className="grid grid_1">
                        <TextField disabled variant="outlined" value={""} label="Cadastrado por"/>
                        <TextField disabled variant="outlined" value={new Date(dados?.createdAt).toLocaleString('pt-BR')} label="Data e Hora de criação" />
                     </div>

                     <div className="grid grid_3">
                        <TextField disabled variant="outlined" value={new Date(dados.data_admissao).toLocaleDateString('pt-BR')} label="Data de Admissão" />
                        <TextField disabled variant="outlined" value={dados?.cbo?.codigo} label="Código CBO" />
                        <TextField disabled variant="outlined" value={dados?.cbo?.descricao} label="Descrição da Atividade" />
                     </div>

                     {/* Botões pra voltar e alterar cadastro*/}
                     <div className="form-buttons">
                        <Button variant="outline-success" onClick={() => {navigate('/Admin_home')}}>Voltar pra tela inicial</Button>
                     <div style={{display: "flex", gap: "20px"}}>
                        {modoEdicao === true ? <Button variant="outline-danger" onClick={() => {setModoEdicao(false); setDadosParaAtualizar({email: dados.email, telefone: dados.telefone})}}>Cancelar</Button> : ""}
                        <Button variant="outline-success" onClick={() => {modoEdicao === true ? (atualizarDados(), setModoEdicao(false)) : setModoEdicao(!modoEdicao)}}>{modoEdicao === false ? "Alterar Cadastro" : "Salvar alterações"}</Button>
                     </div>
                  </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Agente_perfil;