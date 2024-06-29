import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../pages/global.css';
import api from '../../server/api';
import { CiUser } from "react-icons/ci";

export default function Head() {
    const [show, setShow] = useState(false);
    const fechaModal = () => setShow(false);
    const abrirModal = () => setShow(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [id, setId] = useState(0);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("usuario");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }
    }, []);

    const logar = () => {
        if (email.length === 0 || senha.length === 0) {
            alert("Email ou senha incorretos!");
        } else {
            api.post("/usuario", { email, senha })
                .then((resposta) => {
                    const { idUsuario, nomeEmail, nomeUsuario } = resposta.data.usuario;
                    const user = {
                        email: nomeEmail,
                        id: idUsuario,
                        nome: nomeUsuario
                    };
                    setId(idUsuario);
                    setEmail(nomeEmail);
                    setNome(nomeUsuario);
                    setUsuario(user);
                    sessionStorage.setItem("usuario", JSON.stringify(user));
                    fechaModal();
                })
                .catch((erro) => {
                    console.error("Erro ao fazer login: ", erro);
                });
        }
    };
    const sair =()=>{
        if(prompt("Desejar Realmente sair do sistema?")){
            setUsuario(null);
            sessionStorage.removeItem("usuario");
        }
    }
    const getLog = () => {
        if (!usuario) {
            return (
                <div className="container-logo">
                    <button className='btn btn-primary login' onClick={abrirModal}>Login</button>
                </div>
            );
        } else {
            return (
                <div className="container-login">
                    {usuario.nome}
                    <CiUser size={18}className="icon-user" />
                    <button className="btn btn-danger sair" onClick={() => { sair()}}>Sair</button>
                </div>
            );
        }
    };

    return (
        <div className="head">
            <>
                <Modal show={show} onHide={fechaModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-form-login">
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
                            <button className="btn btn-success" onClick={logar}>Logar</button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
            <h2>Controle de Laboratórios</h2>
            {getLog()}
        </div>
    )
}
