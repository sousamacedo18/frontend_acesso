import { useEffect, useState } from "react";

import api from '../../server/api';
import { GiTeacher } from "react-icons/gi";
import { GrUserPolice } from "react-icons/gr";
import { Link } from "react-router-dom";
import Nav from "../../assets/nav";
import Head from "../../assets/head";
import Footer from "../../assets/footer";

export default function Main() {

    const [laboratorios, setLaboratorios] = useState([]);
    const [acessos, setAcessos] = useState({});
    const [show, setShow] = useState(false);

    const fechaModal = () => setShow(false);
    const abrirModal = () => setShow(true);



    const listLaboratorio = async () => {
        try {
            const response = await api.get("/laboratorio");
            setLaboratorios(response.data.laboratorios);
        } catch (error) {
            console.error("Erro ao buscar laboratório:", error);
        }
    };

    function formatarDataBrasileira(dataISO) {
        if (dataISO !== null) {
            const data = new Date(dataISO);
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();

            return `${dia}/${mes}/${ano}`;
        } else {
            return "";
        }
    }

    const listarAcessos = async (id) => {
        try {
            const response = await api.get(`/acesso/${id}`);
            setAcessos((prevAcessos) => ({
                ...prevAcessos,
                [id]: response.data.acessos,
            }));
        } catch (error) {
            console.error('Erro ao buscar acessos:', error);
        }
    };

    useEffect(() => {
        listLaboratorio();
    }, []);

    useEffect(() => {
        laboratorios.forEach((laboratorio) => {
            listarAcessos(laboratorio.IdLaboratorio);
        });
    }, [laboratorios]);

    function formatarHoraMinutos(dataISO) {
        const data = new Date(dataISO);
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');

        return `${horas}:${minutos}`;
    }

    return (
        <div className="index-container">

            <Head />
            <Nav />

            <div className="gallery">
                {
                    laboratorios.map((laboratorio) => (
                        <div key={laboratorio.IdLaboratorio}>
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={require(`../../assets/Imagens/${laboratorio.fotoLaboratorio}`)} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{laboratorio.nomeLaboratorio}</h5>
                                    {
                                        acessos[laboratorio.IdLaboratorio] && acessos[laboratorio.IdLaboratorio].map(acesso => (
                                            <div className="sub-card" key={acesso.IdAcesso}>
                                                <div>
                                                    <p><GrUserPolice size={14} color="red" />{acesso.nomeUsuario}</p>
                                                </div>
                                                <div>
                                                    <p><GiTeacher size={14} color="green" /> {acesso.nomeResponsavel}</p>
                                                    <p>
                                                        <b>Entrada:</b> {formatarDataBrasileira(acesso.dataHoraEntradaAcesso)} Hora: {formatarHoraMinutos(acesso.dataHoraEntradaAcesso)}
                                                    </p>
                                                    <p>
                                                        <b>Saída: </b> {formatarDataBrasileira(acesso.dataHoraSaidaAcesso)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="container-buttons">
                                        <a href="#" className="btn btn-primary">Registrar</a>
                                        <a href="#" className="btn btn-secondary">Detalhes</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Footer />
        </div>
    );
}
