import "./Admin.css"
import Header from "../../components/Header"
import Sidenav from "../../components/Sidenav/Sidenav_admin"
import Breadcrumb from "../../components/Breadcrumb/Index.jsx";
import NavBar from "../../components/NavBar/Index.jsx";
import HomeAddress from '../../components/Sidenav/iconsSideBar/Home Address.png';
import dashIcon from '../../components/Sidenav/iconsSideBar/dashIcon.png';
import query from '../../components/Sidenav/iconsSideBar/query.png';
import AddUserMale from '../../components/Sidenav/iconsSideBar/Add User Male.png';
import api from '../../services/api';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useVerificarCEP } from '../../hooks/useVerificarCEP';
import { Form } from 'react-bootstrap';

async function verificarExistencia(endpoint, cpf) {
   try {
      const res = await api.get(`/${endpoint}/${cpf}`);
      return Array.isArray(res.data?.response) && res.data.response.length > 0;
   } catch (err) {
      if(err.response?.status === 404) return false; 
      throw err; // Throw: Indica onde que teve o erro. No caso de várias verificações onde uma delas dê um erro, o Throw indica que tal verificação que gerou o erro.
   }
}

function Admin_novoCadastro() {
   const navigate = useNavigate();
   
   const [formDados, setFormDados] = useState({
      nome: null,
      nome_social: null,
      cpf: null,
      sus: null,
      data_nascimento: null,
      genero: null,
      etnia: null,
      estado_civil: null,
      nacionalidade: null,
      naturalidade_estado: null,
      naturalidade_municipio: null,
      filiacao_mae: null,
      filiacao_pai: null,
      numero: null,
      complemento: null,
      ponto_referencia: null,
      num_telefone: null,
      email: null,
      profissao: null,
      cbo: null,
      cbo_descricao: null,
      escolaridade: null,
      nome_instituicao: null,
      tipo_instituicao: null,
      estado_clinico: null,
      responsavel_legal: null,
      leitura: 1,
      escrita: 1,
   });

   const handleFormChange = (e) => {
      const {name, value} = e.target;
      setFormDados((dados) => ({
         ...dados,
         [name]: value
      }));
   };
   console.log(formDados)

   const [tipoUsuario, setTipoUsuario] = useState("");
   const handleTypeUser = (e) => {
      const {name, value} = e.target;

      setTipoUsuario(() => (
         name, value
      ));
   };
   console.log(`Tipo de usuario: ${tipoUsuario}`)

   const {cep, cepDados, erro, handleChangeCEP} = useVerificarCEP();

   async function handleRegister(e) {
      e.preventDefault();

      // Realização do cadastro
      const { cpf, nome, email, numero, complemento, ponto_referencia} = formDados;
      try {
         try { // Verifica se o usuário possui autenticação no sistema
            if (await verificarExistencia("usuario", cpf)) {
               alert("Erro ao cadastrar: Usuário já cadastrado");
               return;
            } else {
               console.log("Verificação do usuário realizada");
            }
         } catch(err) {
            console.log(err)
            alert(err)
            return;
         }

         try { // Verifica se o indivíduo a ser cadastrado existe
            if (await verificarExistencia(`${tipoUsuario}`, cpf)) {
               alert(`Erro ao cadastrar: ${tipoUsuario} já cadastrado`);
               return;
            } else {
               console.log(`Verificação do ${tipoUsuario} realizada`);
            }
         } catch(err) {
            console.log(err)
            alert(err)
            return;
         }

         // Primeiro: Será cadastrado um usuário pra permitir o acesso ao sistema, sendo o cpf a PK.
         const usuarioPayload = {cpf, nome, email, senha: "123456789", tipoUsuario: tipoUsuario};
         await api.post('/usuario', usuarioPayload);
         console.log("\n Usuário cadastrado com sucesso. \n")
         
         // Segundo: Após a criação do usuário, será cadastrado em seguida o endereço e o tipo de usuário com seus dados.
         const enderecoPayload = {cep, numero: numero, complemento: complemento, logradouro: cepDados.logradouro, bairro: cepDados.bairro, cidade: cepDados.localidade, 
            estado: cepDados.uf, pais: "Brasil", ponto_referencia: ponto_referencia, id_zona: 1, id_material: 1, id_imovel: 2, id_animal: 2};
         const {data: enderecoResponse} = await api.post('/endereco', enderecoPayload);
         const enderecoCriadoId = enderecoResponse.id;
         console.log("\n Endereço cadastrado com sucesso. \n")

         // Terceiro: Com essa PK, esse usuário será salvo de acordo com seu tipo. Se for paciente, terá que completar o cadastro caso incompleto.
         const cadastroPayload = {...formDados, id_endereco: enderecoCriadoId, id_agente: 1}
         await api.post(`${tipoUsuario}`, cadastroPayload);
         console.log(`\n ${tipoUsuario} cadastrado com sucesso. \n`)

         alert(`${tipoUsuario} cadastrado com sucesso.`);
      } catch(err) {
         alert(err)
         console.log(err.response)
      }
   }

   return(
      <div className="app">
         <Header/>
         <Sidenav/>
         <Breadcrumb homeIcon={<img src={HomeAddress} alt="Home" className="breadcrumb-home-icon" />} items={[{ label: 'Home', href: '' }]} />
         <NavBar items={[
            { label: 'Home', href: '/admin_home', icon: HomeAddress },
            { label: 'Pacientes', href: '/Admin_home-usuario', icon: AddUserMale },
            { label: 'Agenda', href: '/Admin_hist-visitas', icon: query },
            { label: 'Banco', href: '/Admin_b-dados', icon: dashIcon }
         ]} />
         <main className="content-pages content-pages-admin">
            <div className="d-block">
               <div className="title-pages">
                  <svg onClick={() => navigate(-1)} style={{ cursor:"pointer" }} className="align-self-start"
                  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#000000"></path> </g></svg>
                  <h1 className="align-self-center h2 px-5">Cadastrar usuário</h1>
               </div>

               <div className="d-flex align-items-center justify-content-between mx-5 paddingTypeUser">
                  <div>
                     <span className="h4 text-success">Informações de registro</span>
                  </div>
                  
                  <div>
                     <label className="px-3">Informe o tipo de usuário:</label>
                     <Form.Select name="tipo" value={tipoUsuario} onChange={handleTypeUser}>
                        <option hidden selected value>Selecione..</option>
                        <option value="gerente">Gerente do posto</option>
                        <option value="recepcao">Recepção</option>
                        <option value="agente">Agente</option>
                        <option value="paciente">Paciente</option>
                     </Form.Select> 
                  </div>
               </div>

               <Form id="form-registro" onSubmit={handleRegister}>
                  <div>
                     <div className="form-fields">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="nome" value={formDados.nome} onChange={(e) => handleFormChange(e)} type='text' placeholder='Insira o nome completo'/>
                        
                        <Form.Label>Nome Social</Form.Label>
                        <Form.Control name="nome_social" value={formDados.nome_social} onChange={(e) => handleFormChange(e)} type='text' placeholder='Nome Social'/>  
                     </div>

                     <div className="form-fields">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control name="cpf" value={formDados.cpf} onChange={(e) => handleFormChange(e)} type='number' placeholder='CPF'/>
                        
                        <Form.Label>Nº SUS</Form.Label>
                        <Form.Control name="sus" value={formDados.sus} onChange={(e) => handleFormChange(e)} type='number' placeholder='Nº SUS'/>

                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control name="data_nascimento" value={formDados.data_nascimento} onChange={(e) => handleFormChange(e)} type='date' placeholder='Data de Nascimento'/>
                     </div>

                     <div className="form-fields" id='dropDown-A'>
                        <Form.Label>Gênero</Form.Label>
                        <Form.Select className="dropDownMenu-A" name="genero" value={formDados.genero} onChange={handleFormChange}>
                           <option hidden selected value>Selecione..</option>
                           <option value="masculino">Masculino</option>
                           <option value="feminino">Feminino</option>
                           <option value="naobinario">Não-binário</option>
                           <option value="outro">Outro</option>
                        </Form.Select> 

                        <Form.Label>Etnia</Form.Label>
                        <Form.Select className="dropDownMenu-A" name="etnia" value={formDados.etnia} onChange={handleFormChange}>
                           <option hidden selected value>Selecione..</option>
                           <option value="branco">Branco(a)</option>
                           <option value="preto">Preto(a)</option>
                           <option value="pardo">Pardo(a)</option>
                           <option value="indigena">Indígena</option>
                           <option value="asiatico">Asiático(a)</option>
                           <option value="outro">Outro</option>
                        </Form.Select> 

                        <Form.Label>Estado Civil</Form.Label>
                        <Form.Select className="dropDownMenu-A" name="estado_civil" value={formDados.estado_civil} onChange={handleFormChange}>
                           <option hidden selected value>Selecione..</option>
                           <option value="solteiro">Solteiro(a)</option>
                           <option value="casado">Casado(a)</option>
                           <option value="separado">Separado(a)</option>
                        </Form.Select> 
                     </div>
                     
                     <div className="form-fields">                           
                        <Form.Label>Nacionalidade</Form.Label>
                        <Form.Select name="nacionalidade" value={formDados.nacionalidade} onChange={handleFormChange}>
                           <option hidden selected value>Selecione..</option>
                           <option value="brasileiro">Brasileiro(a)</option>
                           <option value="estrangeiro">Estrangeiro(a)</option>
                           <option value="naturalizado">Naturalizado(a)</option>
                        </Form.Select> 
        
                        <Form.Label>Naturalidade</Form.Label>
                        <Form.Select name="naturalidade_estado" value={formDados.naturalidade_estado} onChange={handleFormChange}>
                           <option hidden selected value>Selecione..</option>
                           <optgroup label="Norte">
                              <option value="acre">Acre</option>
                              <option value="amapa">Amapá</option>
                              <option value="amazonas">Amazonas</option>
                              <option value="para">Pará</option>
                              <option value="rondonia">Rondônia</option>
                              <option value="roraima">Roraima</option>
                              <option value="tocantins">Tocantins</option>
                           </optgroup>
                           <optgroup label="Nordeste">
                              <option value="alagoas">Alagoas</option>
                              <option value="bahia">Bahia</option>
                              <option value="ceara">Ceará</option>
                              <option value="maranhao">Maranhão</option>
                              <option value="paraiba">Paraíba</option>
                              <option value="pernambuco">Pernambuco</option>
                              <option value="piaui">Piauí</option>
                              <option value="rio grande do norte">Rio Grande do Norte</option>
                              <option value="sergipe">Sergipe</option>
                           </optgroup>
                           <optgroup label="Centro-Oeste">
                              <option value="distrito federal">Distrito Federal</option>
                              <option value="goias">Goiás</option>
                              <option value="mato grosso">Mato Grosso</option>
                              <option value="mato grosso do sul">Mato Grosso do Sul</option>
                           </optgroup>
                           <optgroup label="Sudeste">
                              <option value="espirito santo">Espírito Santo</option>
                              <option value="minas gerais">Minas Gerais</option>
                              <option value="rio de janeiro">Rio de Janeiro</option>
                              <option value="sao paulo">São Paulo</option>
                           </optgroup>
                           <optgroup label="Sul">
                              <option value="parana">Paraná</option>
                              <option value="rio grande do sul">Rio Grande do Sul</option>
                              <option value="santa Catarina">Santa Catarina</option>
                           </optgroup>
                        </Form.Select> 

                        <Form.Control name="naturalidade_municipio" value={formDados.naturalidade_municipio} onChange={(e) => handleFormChange(e)} type='text' placeholder='Municipio'/>
                     </div>

                     <div className="form-fields">
                        <Form.Label>Nome da mãe</Form.Label>
                        <Form.Control name="filiacao_mae" value={formDados.filiacao_mae} onChange={(e) => handleFormChange(e)} type='text' placeholder='Nome da mãe'/>

                        <Form.Label>Nome do pai</Form.Label>
                        <Form.Control name="filiacao_pai" value={formDados.filiacao_pai} onChange={(e) => handleFormChange(e)} type='text' placeholder='Nome do pai'/>
                     </div>
                  </div>
                        
                           <br/><hr/><br/>

                  <div>
                     <span className="h4 text-success">Endereço atual</span>
                  </div>

                  <div className="form-fields"> {/* Cadastro do Endereço */}
                     <Form.Label>CEP</Form.Label>
                     <Form.Control value={cep} onChange={handleChangeCEP} type='text' placeholder='Digite o CEP'/>

                     <Form.Label>Logradouro</Form.Label>
                     <Form.Control value={cepDados.logradouro} readOnly type='text' placeholder='Logradouro'/>
                     
                     <Form.Label>Número</Form.Label>
                     <Form.Control name="numero" value={formDados.numero} onChange={(e) => handleFormChange(e)} type='text' placeholder='Número' className="compact-input"/>
                     
                     <Form.Label>Complemento</Form.Label>
                     <Form.Control name="complemento" value={cepDados.complemento} onChange={(e) => handleFormChange(e)} type='text' placeholder='Complemento'/>
                  </div>

                  <div className="form-fields">
                     <Form.Label>Bairro</Form.Label>
                     <Form.Control value={cepDados.bairro} readOnly type='text' placeholder='Bairro'/>

                     <Form.Label>Município</Form.Label>
                     <Form.Control value={cepDados.localidade} readOnly onChange={(e) => {setLocalidade(e.target.value)}} type='text' placeholder='Município'/>
                   
                     <div className="form-fields compact-input">
                        <Form.Label>Estado</Form.Label><br></br>
                        <Form.Control value={cepDados.uf} readOnly onChange={(e) => {setLocalidade(e.target.value)}} type='text' placeholder='Estado'/>
                     </div>

                     <Form.Label>Ponto de Referência</Form.Label>
                     <Form.Control name="ponto_referencia" value={formDados.ponto_referencia} onChange={(e) => handleFormChange(e)} type='text' placeholder='Ponto de Referência'/>
                  </div>

                           <br/><hr/><br/>

                  <div>
                     <span className="h4 text-success">Contato</span>
                  </div>

                  <div className="form-fields">
                     <Form.Label>Telefone</Form.Label>
                     <Form.Control name="num_telefone" value={formDados.num_telefone} onChange={(e) => handleFormChange(e)} type='number' placeholder='Telefone'/>
                     
                     {/* <Form.Label>Celular</Form.Label>
                     <Form.Control value={"num_celular"} onChange={(e) => {setNome(e.target.value)}} type='number' placeholder='Celular'/> */}
                    
                     <Form.Label>E-mail</Form.Label>
                     <Form.Control name="email" value={formDados.email} onChange={(e) => handleFormChange(e)} type='email' placeholder='E-mail'/>
                  </div>

                           <br/><hr/><br/>

                  <div>
                     <span className="h4 text-success">Profissão e Escolaridade</span>
                  </div>

                           {/* Revisar os VALUES daqui pra baixo */}
                  <div className="form-fields">
                     <Form.Label>Ocupação</Form.Label> {/* pegar da CBO */}
                     <Form.Control name="profissao" value={formDados.profissao} onChange={(e) => handleFormChange(e)} type='text' placeholder='Ocupação'/>
                     
                     <Form.Label>CBO</Form.Label>
                     <Form.Control name="cbo" value={formDados.cbo} onChange={(e) => handleFormChange(e)} type='number' placeholder='Código' className="compact-input"/>
                     <Form.Control name="cbo_descricao" value={formDados.cbo_descricao} onChange={(e) => handleFormChange(e)} type='text' placeholder='Descrição da Atividade'/>
                  </div><br />

                  <div className="form-fields">
                     <div>
                        <Form.Label>Escolaridade</Form.Label>
                        <Form.Select name="escolaridade" value={formDados.escolaridade} onChange={handleFormChange}>
                           <option hidden selected value>Selecione..</option>
                           <option value="desconhecido">Não frequentou/Não sabe</option>
                           <option value="inf_inc">Ensino Infantil Incompleto</option>
                           <option value="inf_comp">Ensino Infantil Completo</option>
                           <option value="fund_inc">Ensino Fundamental Incompleto</option>
                           <option value="fund_comp">Ensino Fundamental Completo</option>
                           <option value="medio_inc">Ensino Médio Incompleto</option>
                           <option value="medio_comp">Ensino Médio Completo</option>
                           <option value="sup_inc">Ensino Superior Incompleto</option>
                           <option value="sup_comp">Ensino Superior Completo</option>
                        </Form.Select> 
                     </div>
                  </div><br />

                  <div className="form-fields py-3">
                     <Form.Label>Nome da Instituição</Form.Label>
                     <Form.Control name="nome_instituicao" value={formDados.nome_instituicao} onChange={(e) => handleFormChange(e)} type='text' placeholder='Nome da Instituição de Ensino'/>
                     
                     <Form.Label>Tipo de Instituição</Form.Label>
                     <Form.Select name="tipo_instituicao" value={formDados.tipo_instituicao} onChange={handleFormChange}>
                        <option hidden selected value>Selecione..</option>
                        <option value="Escola Pública">Escola Pública</option>
                        <option value="Escola Particular">Escola Particular</option>
                        <option value="Faculdade Pública">Faculdade Pública</option>
                        <option value="Faculdade Particular">Faculdade Particular</option>
                        <option value="Universidade Pública">Universidade Pública</option>
                        <option value="Universidade Particular">Universidade Particular</option>
                     </Form.Select> 
                  </div>

                  <div className="form-fields py-3">
                     <Form.Label>Estado Clínico</Form.Label>
                     <Form.Select name="estado_clinico" value={formDados.estado_clinico} onChange={handleFormChange}>
                        <option hidden selected value>Selecione..</option>
                        <option value="Estável">Estável</option>
                        <option value="Instável">Instável</option>
                        <option value="Leve">Leve</option>
                        <option value="Crítico">Crítico</option>
                        <option value="Grave">Grave</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Óbito">Óbito</option>
                        <option value="Paliativo">Paliativo</option>

                     </Form.Select>

                     <Form.Label>Responsável Legal</Form.Label>
                     <Form.Control name="responsavel_legal" value={formDados.responsavel_legal} onChange={(e) => handleFormChange(e)} type='text' placeholder='Responsável Legal'/>
                     
                     <div className="form-fields">
                        Sabe ler? <Form.Check id={formDados.leitura} type="switch" onChange={(e) => handleFormChange(e)}/>
                     </div>

                     <div className="form-fields">
                        Sabe escrever? <Form.Check id={formDados.escrita} type="switch" onChange={(e) => handleFormChange(e)}/>
                     </div>
                  </div>

                  <br/><hr/>
               </Form>
               
               {/* Botões pra voltar pra tela inicial/realizar cadastro */}
               <div className="form-button">
                  <button className="btn btn-light border-dark border-opacity-75 px-4 py-2" onClick={() => {navigate('/Admin_home')}}>Voltar pra tela inicial</button>
                  <button form="form-registro" className="btn btn-light border-dark border-opacity-75 px-4 py-2">Realizar cadastro</button>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Admin_novoCadastro;