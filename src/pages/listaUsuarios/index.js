import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../server/api';
import { Link } from "react-router-dom";
import Nav from "../../assets/nav";
import Head from "../../assets/head";
import Footer from "../../assets/footer";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Listausuarios() {
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [idCargo,setIdCargo] = useState(1);
    const [id,setId] = useState(1);

    const usuario={
        id,
        nome,
        email,
        senha,
        confSenha,
        idCargo
    }
    const fechaModal = () => setShow(false);
    const abrirModal = () => setShow(true);

    const fechaModalUpdate = () => setShowUpdate(false);
    const abrirModalUpdate = () => setShowUpdate(true);

    const listarUsuarios = async () => {
        try {
            const response = await api.get("/usuario");
            setUsuarios(response.data.usuarios);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };
    const editarUsuario=(i)=>{
        api.get(`/usuario/${i}`)
        .then((resposta)=>{
            setNome(resposta.data.usuario.nomeUsuario);
            setEmail(resposta.data.usuario.emailUsuario);
            setId(resposta.data.usuario.idUsuario);
         
        })
    }
    const limparCampos=()=>{
        setNome("");
        setEmail("");
        setSenha("");
        setConfSenha();
    }
    const salvar = (e) => {
        e.preventDefault();
        if(email.length==0 || nome.length==0 || senha.length==0){
            alert("Todos os campos devem ser preenchidos!!!!!")
        }else if(senha!==confSenha){
            alert("A senhas digitadas não são iguais!")
        }else{
        // Lógica para salvar um novo usuário
        api.post("/usuario/cadastro",usuario)
        .then((resposta)=>{
            if(resposta.status==201){
                fechaModal();
                limparCampos();
                alert(resposta.data.mensagem)
            }
            if(resposta.status==400){
                alert(resposta.data.mensagem)
            }
            if(resposta.status==409){
                alert(resposta.data.mensagem)
            }
            if(resposta.status==500){
                alert(resposta.data.mensagem)
            }
        })

        }

    };

    const SaveUpdate = (e) => {
        e.preventDefault();
        if(email.length==0 || nome.length==0 || senha.length==0){
            alert("Todos os campos devem ser preenchidos!!!!!")
        }else{
            api.put("/usuario", usuario)
            .then((resposta)=>{
                if(resposta.status==200){
                    listarUsuarios();
                    alert(resposta.data.mensagem);
                }
            })
        }
        
    };

    useEffect(() => {
        listarUsuarios();
    }, []);

    return (
        <div className="index-container">
            <Head />
            <Nav />

            {/* Modal para novo usuário */}
            <Modal show={show} onHide={fechaModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-form-login">
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Senha"
                        />
                        <input
                            type="password"
                            value={confSenha}
                            onChange={(e) => setConfSenha(e.target.value)}
                            placeholder="Confirmar Senha"
                        />
                        <button className="btn btn-success" onClick={salvar}>Salvar</button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Modal para editar usuário */}
            <Modal show={showUpdate} onHide={fechaModalUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container-form-login">
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />

                        <button className="btn btn-success" onClick={SaveUpdate}>Salvar</button>
                    </div>
                </Modal.Body>
            </Modal>
     
            <div className="main">
                <div>
                <button onClick={abrirModal}  className="btn btn-success">Novo</button>
                </div>
                <table>
                
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.idUsuario}>
                                <td>{usuario.idUsuario}</td>
                                <td>{usuario.nomeUsuario}</td>
                                <td>{usuario.emailUsuario}</td>
                                <td>
                                    <FiEdit size={20} className="btn-update" color="blue" onClick={abrirModalUpdate} />
                                </td>
                                <td>
                                    <RiDeleteBin5Line size={20} className="btn-update" color="red" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    );
}
