import "./Agente.css"
import Header from "../../components/Header/"
import Sidenav from "../../components/Sidenav/Sidenav_agente/"
import ButtonBack from "../../components/ButtonBack/Index"
import PageWIP from "../../components/PageWIP/Index"
import api from '../../services/api';
import { Link, useNavigate  } from "react-router-dom";
import { useEffect, useState} from 'react';
import { useVerificarCEP } from '../../hooks/useVerificarCEP';
import { TextField, Select, MenuItem, FormControl, InputLabel, ListSubheader, Switch } from "@mui/material";
import { PatternFormat } from 'react-number-format';
import { Button, Form } from 'react-bootstrap';
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import AddUserMale from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import { GoReply } from "react-icons/go";

async function verificarExistencia(endpoint, dados) {
   
   try {
      const res = await api.post(`/${endpoint}/verificarDados`, dados);
      return res.data?.response === "Paciente já cadastrado no sistema.";
   } catch (err) {
      if(err.response?.status === 404) return false; 
      throw err; // Throw: Indica onde que teve o erro. No caso de várias verificações onde uma delas dê um erro, o Throw indica que tal verificação que gerou o erro.
   }
}

function Agente_cadUsuario() {
   const [modoEdicao, setModoEdicao] = useState(false);

   const navigate = useNavigate();

   const [leitura, setLeitura] = useState(true);

   useEffect(() => {
      console.log("leitura", leitura);
   }, [leitura])
   
   const [formNovoPaciente, setFormNovoPaciente] = useState({
      nome: null,
      nome_social: null,
      cpf: null,
      sus: null,
      data_nascimento: null,
      genero: '',
      etnia: '',
      estado_civil: '',
      nacionalidade: '',
      naturalidade_estado: '',
      naturalidade_municipio: null,
      filiacao_mae: null,
      filiacao_pai: null,

      logradouro: null,
      numero: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null,
      cep: null,
      ponto_referencia: null,
      
      num_telefone: null,
      email: null,
      escolaridade: '',
      nome_instituicao: null,
      tipo_instituicao: '',
      estado_clinico: '',
      leitura: true,
      escrita: true,
      responsavel_legal: null,

      // profissao: null,
      cbo: null,
      cbo_descricao: null,
   });

   const handleFormChange = (e) => {
      const {name, value, type, checked} = e.target; // Recebe o tipo do input (input normal ou checkbox-switch), seu identificador (name) e o valor.
      const valor = type === 'checkbox' ? checked : value; // Se for um input do tipo checkbox, utiliza a prop checked, caso contrário, value.

      setFormNovoPaciente((dados) => ({

         ...dados,
         [name]: valor
      }));
   };

   const {cep, cepDados, erro, handleChangeCEP} = useVerificarCEP(setFormNovoPaciente);

   async function handleRegister(e) {
      e.preventDefault();

      // Realização do cadastro
      const { cpf, nome, email, numero, complemento, ponto_referencia} = formNovoPaciente;
      try {
         try { // Verifica se o indivíduo a ser cadastrado existe
            const dados = {cpf, email};
            const verificarPaciente = await verificarExistencia("paciente", dados)

            if (verificarPaciente) {
               alert("Paciente já existe")
            } else {
               console.log(`Verificação da existencia do Paciente realizada. A existencia é `, verificarPaciente);
            }

            // Primeiro: Será cadastrado um usuário pra permitir o acesso ao sistema, sendo o cpf a PK.
            const usuarioPayload = {cpf, nome, email, senha: "123456789", tipoUsuario: "paciente"};
            await api.post('/usuario', usuarioPayload);
            console.log("\n Usuário cadastrado com sucesso. \n")
            
            // Segundo: Após a criação do usuário, será cadastrado em seguida o endereço e o tipo de usuário com seus dados.
            const enderecoPayload = {cep, numero: numero, complemento: complemento, logradouro: cepDados.logradouro, bairro: cepDados.bairro, cidade: cepDados.localidade, 
               estado: cepDados.uf, pais: "Brasil", ponto_referencia: ponto_referencia, id_zona: 1, id_material: 1, id_imovel: 2, id_animal: 2};
            const {data: enderecoResponse} = await api.post('/endereco', enderecoPayload);
            const enderecoCriadoId = enderecoResponse.id;
            console.log("\n Endereço cadastrado com sucesso. \n")

            // Terceiro: Com essa PK, esse usuário será salvo de acordo com seu tipo. Se for paciente, terá que completar o cadastro caso incompleto.
            const cadastroPayload = {...formNovoPaciente, id_endereco: enderecoCriadoId, id_agente: 1}
            await api.post(`/paciente`, cadastroPayload);
            console.log(`\n Paciente cadastrado com sucesso. \n`)
            alert(`Paciente cadastrado com sucesso.`);

         } catch(err) {
            console.log(err)
            throw(err)
         }
      } catch(err) {
         alert(err)
         console.log(err.response)
      }
   }

   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />}
                  items={[
                     { label: 'Home', href: '/Agente_home' },
                     { label: 'Cadastro de Pacientes', href: '/Agente_home-usuario' },
                     { label: 'Cadatrar Novo Paciente', href: '/Agente_cad-usuario' },
                     ]} />
         <NavBar items={[
            { label: 'Home', href: '/agente_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Agente_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Agente_hist-visitas', icon: query },
            { label: 'Dash', href: '/Agente_dashboards', icon: dashIcon }
         ]} />
         <main className="content-pages">
            <div className="content-pages-agente">
               <div className="content-agente_CadAltUsuario">
                  <div className="title-pages">
                     <GoReply onClick={() => navigate(-1)}/>
                     <h1 className="align-self-center h2 px-5">Cadastrar Novo Paciente</h1>
                  </div>

                  <div className="elements-agente_CadAltUsuario">
                     <form id="form-novo_paciente-agente" onSubmit={handleRegister}>
                        <span className="h4 text-success subtitle">Informações de registro</span>
                        <div className="grid grid_1">
                           <TextField name="nome" label="Nome do Paciente" value={formNovoPaciente.nome} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                           <TextField name="nome_social" label="Nome Social" value={formNovoPaciente.nome_social} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                        </div>
                        
                        <div className="grid grid_1">
                           <TextField name="filiacao_mae" label="Nome da mãe" value={formNovoPaciente.filiacao_mae} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                           <TextField name="filiacao_pai" label="Nome do pai" value={formNovoPaciente.filiacao_pai} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                        </div>

                        <div className="grid grid_2">
                           <PatternFormat name="cpf" label="Número do CPF" value={formNovoPaciente.cpf} format="###.###.###-##" mask="" customInput={TextField} variant="outlined"/>
                           <PatternFormat name="sus" label="Número do SUS" value={formNovoPaciente.sus} format="###.####.####.####" mask="_" customInput={TextField} variant="outlined"/>
                           <TextField name="data_nascimento" label="Data de Nascimento" value={formNovoPaciente.data_nascimento} InputLabelProps={{ shrink: true }} type="date" variant="outlined" onChange={(e) => handleFormChange(e)}/>
                        </div>

                        <div className="grid grid_2">
                           <FormControl variant="outlined" required>
                              <InputLabel id="selectGenero">Gênero</InputLabel>
                              <Select className="select-agente_CadAltUsuario" name="genero" value={formNovoPaciente.genero} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectGenero" >
                                 <MenuItem hidden selected value>Selecione..</MenuItem>
                                 <MenuItem value="Masculino">Masculino</MenuItem>
                                 <MenuItem value="Feminino">Feminino</MenuItem>
                                 <MenuItem value="Não-Binário">Não-binário</MenuItem>
                                 <MenuItem value="Outro">Outro</MenuItem>
                              </Select>
                           </FormControl>

                           <FormControl variant="outlined" required>
                              <InputLabel id="selectEtnia">Etnia</InputLabel>
                              <Select className="select-agente_CadAltUsuario" name="etnia" value={formNovoPaciente.etnia} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectEtnia" >
                                 <MenuItem hidden selected value>Selecione..</MenuItem>
                                 <MenuItem value="Branco">Branco(a)</MenuItem>
                                 <MenuItem value="Preto">Preto(a)</MenuItem>
                                 <MenuItem value="Pardo">Pardo(a)</MenuItem>
                                 <MenuItem value="Indígena">Indígena</MenuItem>
                                 <MenuItem value="Asiático">Asiático(a)</MenuItem>
                                 <MenuItem value="Outro">Outro</MenuItem>
                              </Select>
                           </FormControl>

                           <FormControl variant="outlined" required>
                              <InputLabel id="selectEstadoCivil">Estado Civil</InputLabel>
                              <Select className="select-agente_CadAltUsuario" name="estado_civil" value={formNovoPaciente.estado_civil} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectEstadoCivil" >
                                 <MenuItem hidden selected value>Selecione..</MenuItem>
                                 <MenuItem value="Solteiro">Solteiro(a)</MenuItem>
                                 <MenuItem value="Casado">Casado(a)</MenuItem>
                                 <MenuItem value="Separado">Separado(a)</MenuItem>
                              </Select>
                           </FormControl>
                        </div>
                        
                        <div className="grid grid_2">
                           <FormControl variant="outlined" required>
                              <InputLabel id="selectNacionalidade">Nacionalidade</InputLabel>
                              <Select className="select-agente_CadAltUsuario" name="nacionalidade" value={formNovoPaciente.nacionalidade} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectNacionalidade" >
                                 <MenuItem hidden selected value>Selecione..</MenuItem>
                                 <MenuItem value="Brasileiro">Brasileiro(a)</MenuItem>
                                 <MenuItem value="Estrangeiro">Estrangeiro(a)</MenuItem>
                                 <MenuItem value="Naturalizado">Naturalizado(a)</MenuItem>
                              </Select>
                           </FormControl>

                           <FormControl variant="outlined" required>
                              <InputLabel id="selectNaturalidade">Naturalidade</InputLabel>
                              <Select className="select-agente_CadAltUsuario" name="naturalidade_estado" value={formNovoPaciente.naturalidade_estado} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectNaturalidade" >
                                 <MenuItem hidden selected value>Selecione..</MenuItem>
                                 <ListSubheader>Norte</ListSubheader>
                                    <MenuItem value="Acre">Acre</MenuItem>
                                    <MenuItem value="Amapá">Amapá</MenuItem>
                                    <MenuItem value="Amazonas">Amazonas</MenuItem>
                                    <MenuItem value="Pará">Pará</MenuItem>
                                    <MenuItem value="Rondônia">Rondônia</MenuItem>
                                    <MenuItem value="Roraima">Roraima</MenuItem>
                                    <MenuItem value="Tocantins">Tocantins</MenuItem>
                                    
                                 <ListSubheader>Nordeste</ListSubheader>
                                    <MenuItem value="Alagoas">Alagoas</MenuItem>
                                    <MenuItem value="Bahia">Bahia</MenuItem>
                                    <MenuItem value="Ceará">Ceará</MenuItem>
                                    <MenuItem value="Maranhão">Maranhão</MenuItem>
                                    <MenuItem value="Paraíba">Paraíba</MenuItem>
                                    <MenuItem value="Pernambuco">Pernambuco</MenuItem>
                                    <MenuItem value="Piauí">Piauí</MenuItem>
                                    <MenuItem value="Rio Grande do Norte">Rio Grande do Norte</MenuItem>
                                    <MenuItem value="Sergipe">Sergipe</MenuItem>

                                 <ListSubheader>Centro-Oeste</ListSubheader>
                                    <MenuItem value="Sergipe">Distrito Federal</MenuItem>
                                    <MenuItem value="Goiás">Goiás</MenuItem>
                                    <MenuItem value="Mato Grosso">Mato Grosso</MenuItem>
                                    <MenuItem value="Mato Grosso do Sul">Mato Grosso do Sul</MenuItem>

                                 <ListSubheader>Sudeste</ListSubheader>
                                    <MenuItem value="Espírito Santo">Espírito Santo</MenuItem>
                                    <MenuItem value="Minas Gerais">Minas Gerais</MenuItem>
                                    <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
                                    <MenuItem value="São Paulo">São Paulo</MenuItem>

                                 <ListSubheader>Sul</ListSubheader>
                                    <MenuItem value="Paraná">Paraná</MenuItem>
                                    <MenuItem value="Rio Grande do Sul">Rio Grande do Sul</MenuItem>
                                    <MenuItem value="Santa Catarina">Santa Catarina</MenuItem>
                              </Select>
                           </FormControl>

                           <TextField name="naturalidade_municipio" label="Municipio" value={formNovoPaciente.naturalidade_municipio} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                        </div>
                              
                        <hr/>

                        <span className="h4 text-success subtitle">Endereço atual</span>
                        <div className="grid grid_2">
                           <PatternFormat name="cep" label="CEP" value={formNovoPaciente.cep} variant="outlined" format="#####-###" mask=" " customInput={TextField}  onChange={handleChangeCEP}/>
                           <TextField name="logradouro" value={formNovoPaciente.logradouro} variant="outlined" onChange={(e) => handleFormChange(e)} label="Logradouro"/>
                           <PatternFormat name="numero" label="Número" value={formNovoPaciente.numero} format={(formNovoPaciente.numero || "").replace(/\D/g, '').length > 3 ? "#.###" : "###"} mask=" " customInput={TextField} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                        </div>

                        <div className="grid grid_3">
                           <TextField name="complemento" value={formNovoPaciente.complemento} variant="outlined" onChange={(e) => handleFormChange(e)} label="Complemento"/>
                           <TextField name="ponto_referencia" readOnly value={formNovoPaciente.ponto_referencia} variant="outlined" onChange={(e) => handleFormChange(e)} label="Ponto de Referência"/>
                        </div>

                        <div className="grid grid_2">
                           <TextField name="bairro" readOnly value={formNovoPaciente.bairro} variant="outlined" onChange={handleChangeCEP} label="Bairro"/>
                           <TextField name="cidade" readOnly value={formNovoPaciente.cidade} variant="outlined" onChange={handleChangeCEP} label="Município"/>
                           <TextField name="estado" readOnly value={formNovoPaciente.estado} variant="outlined" onChange={handleChangeCEP} label="Estado"/>
                        </div>

                        <hr/>


                        <span className="h4 text-success subtitle">Contato</span>
                        <div className="grid grid_1">
                           <PatternFormat name="num_telefone" label="Telefone" value={formNovoPaciente.num_telefone} format={(formNovoPaciente.num_telefone || "").replace(/\D/g, '').length > 10 ? "(##) # ####-####" : "(##) ####-####"} mask=" " customInput={TextField} variant="outlined" onChange={(e) => handleFormChange(e)}/>
                           <TextField name="email" label="Email" value={formNovoPaciente.email} type="email" variant="outlined" onChange={(e) => handleFormChange(e)}/>
                        </div>

                        <hr/>


                        <span className="h4 text-success subtitle">Profissão e Escolaridade</span>
                                 {/* Revisar os VALUES daqui pra baixo */}
                        <div className="grid grid_2">
                           {/* <Form.Label>Ocupação</Form.Label> {/* pegar da CBO */}
                           {/* <Form.Control disabled name="profissao" value={formNovoPaciente.profissao} onChange={(e) => handleFormChange(e)} type='text' placeholder='Ocupação'/> */}
                           
                           <Form.Label>CBO</Form.Label>
                           <Form.Control name="cbo" maxLength={4} value={formNovoPaciente.cbo} onChange={(e) => handleFormChange(e)} type='text' placeholder='Código' className="compact-input"/>
                           <Form.Control name="cbo_descricao" value={formNovoPaciente.cbo_descricao} onChange={(e) => handleFormChange(e)} type='text' placeholder='Descrição da Atividade'/>
                        </div><br />

                        <div className="grid grid_2">
                           <FormControl variant="outlined" required>
                              <InputLabel id="selectEscolaridade">Escolaridade</InputLabel>
                              <Select className="select-agente_CadAltUsuario" name="escolaridade" value={formNovoPaciente.escolaridade} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectEscolaridade">
                                 <MenuItem hidden selected value>Selecione..</MenuItem>
                                 <MenuItem value="Não frequentou/Não sabe">Não frequentou/Não sabe</MenuItem>
                                 <MenuItem value="Ensino Infantil Incompleto">Ensino Infantil Incompleto</MenuItem>
                                 <MenuItem value="Ensino Infantil Completo">Ensino Infantil Completo</MenuItem>
                                 <MenuItem value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</MenuItem>
                                 <MenuItem value="Ensino Fundamental Completo">Ensino Fundamental Completo</MenuItem>
                                 <MenuItem value="Ensino Médio Incompleto">Ensino Médio Incompleto</MenuItem>
                                 <MenuItem value="Ensino Médio Completo">Ensino Médio Completo</MenuItem>
                                 <MenuItem value="Ensino Superior Incompleto">Ensino Superior Incompleto</MenuItem>
                                 <MenuItem value="Ensino Superior Completo">Ensino Superior Completo</MenuItem>
                              </Select>
                           </FormControl>

                           <TextField name="nome_instituicao" label="Instituição de Ensino" value={formNovoPaciente.nome_instituicao} type="email" variant="outlined" onChange={(e) => handleFormChange(e)}/>
                           
                           <FormControl variant="outlined" required>
                              <InputLabel id="selectTipoInstituicao">Tipo de Instituição</InputLabel>
                              <Select className="select-agente_CadAltUsuario" name="tipo_instituicao" value={formNovoPaciente.tipo_instituicao} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectTipoInstituicao">
                                 <MenuItem hidden selected value>Selecione..</MenuItem>
                                 <MenuItem value="Escola Pública">Escola Pública</MenuItem>
                                 <MenuItem value="Escola Particular">Escola Particular</MenuItem>
                                 <MenuItem value="Faculdade Pública">Faculdade Pública</MenuItem>
                                 <MenuItem value="Faculdade Particular">Faculdade Particular</MenuItem>
                                 <MenuItem value="Universidade Pública">Universidade Pública</MenuItem>
                                 <MenuItem value="Universidade Particular">Universidade Particular</MenuItem>
                              </Select>
                           </FormControl>
                        </div>

                        <div className="grid grid_2 py-3">
                           <FormControl variant="outlined" required>
                              <InputLabel id="selectEstadoClinico">Estado Clínico</InputLabel>
                              <Select className="select-agente_CadAltUsuario" name="estado_clinico" value={formNovoPaciente.estado_clinico} variant="outlined" onChange={(e) => handleFormChange(e)} labelId="selectEstadoClinico">
                                 <MenuItem hidden selected value>Selecione..</MenuItem>
                                 <MenuItem value="Estável">Estável</MenuItem>
                                 <MenuItem value="Instável">Instável</MenuItem>
                                 <MenuItem value="Leve">Leve</MenuItem>
                                 <MenuItem value="Crítico">Crítico</MenuItem>
                                 <MenuItem value="Grave">Grave</MenuItem>
                                 <MenuItem value="Moderado">Moderado</MenuItem>
                                 <MenuItem value="Óbito">Óbito</MenuItem>
                                 <MenuItem value="Paliativo">Paliativo</MenuItem>
                              </Select>
                           </FormControl>

                           <TextField name="responsavel_legal" label="Responsável Legal" value={formNovoPaciente.responsavel_legal} type="text" variant="outlined" onChange={(e) => handleFormChange(e)}/>
                           
                           <div className="grid grid_2">
                              <InputLabel id="switchLeitura">Saber ler?</InputLabel>
                              <Switch name="leitura" checked={formNovoPaciente.leitura} required id="switchLeitura" onChange={(event) => setFormNovoPaciente(event.target.checked)}/>

                              <InputLabel id="switchEscrever">Saber escrever?</InputLabel>
                              <Switch name="escrita" checked={formNovoPaciente.escrita} required id="switchEscrever" onChange={(e) => handleFormChange(e)}/>
                           </div>
                        </div>

                        <br/><hr/>
                     </form>
                  </div>
                  
                  {/* Botões pra voltar pra tela inicial/realizar cadastro */}
                  <div className="form-button">
                     <button className="btn btn-light border-dark border-opacity-75 px-4 py-2" onClick={() => {navigate('/Agente_home')}}>Voltar pra tela inicial</button>
                     <button form="form-novo_paciente-agente" className="btn btn-light border-dark border-opacity-75 px-4 py-2">Realizar cadastro</button>
                  </div>

                  <div className="form-buttons">
                     <Button variant="outline-success" onClick={() => {navigate('/Agente_home')}}>Voltar pra tela inicial</Button>
                     <div style={{display: "flex", gap: "20px"}}>
                        {modoEdicao === false ? <Button variant="outline-success" onClick={() => {''}}>Cancelar</Button> : ""}
                        <Button variant="outline-success" onClick={() => setModoEdicao(!modoEdicao)}>{modoEdicao === false ? "Salvar alterações" : "Alterar Cadastro"}</Button>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Agente_cadUsuario;