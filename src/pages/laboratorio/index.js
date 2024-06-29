import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css';
import api from '../../server/api';
import { GiTeacher } from "react-icons/gi";
import { GrUserPolice } from "react-icons/gr";
import { Link } from "react-router-dom";
import nav from "../../assets/nav";
import Nav from "../../assets/nav";

export default function Laboratorio() {
    const [nome, setNome] = useState('');
    const [caminho,setCaminho] = useState("");
    const [id, setId] = useState(0);




    const salvar = () => {
        if (nome.length === 0 || caminho.length === 0) {
            alert("dados incompletos!");
        } else {
            api.post("/laboratorio", { nome, caminho })
                .then((resposta) => {
                      if(resposta.status==="200"){
                        alert(resposta.data.mensagem)
                      }
                })
                .catch((erro) => {
                    console.error("Erro ao fazer login: ", erro);
                });
        }
    };




    return (
        <div className="index-container">

           <Nav />


            <div className="footer"></div>
        </div>
    );
}
