import React from 'react';
import './styles.css';
import logoimg from '../../assets/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import {useEffect,useState} from 'react';

import api from '../../services/api';

export default function Profile(){

    const [incidents,setIncidents]  = useState([]);
    const ongNome = localStorage.getItem("ongNome");
    const ongId = localStorage.getItem("ongId");
    const history = useHistory();

    useEffect(() =>{
        api.get('all_incidents',{
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    },[ongId]);

    async function handleDelete(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers :{
                    Authorization : ongId
                }
            }) 

            setIncidents(incidents.filter(incident => incident.id !== id))

        }catch(err){
            alert("Erro ao deletar caso, tente novamente.");
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="Logo"/>
                <span>Bem vinda, {ongNome}</span>
                <Link className="button" to="/incidentes/criar">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASO: </strong>
                    <p>{incident.titulo}</p>

                    <strong>DESCRICAO: </strong>
                    <p>{incident.descricao}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style : 'currency', currency: 'BRL'}).format(incident.valor)}</p>

                    <button onClick={() => handleDelete(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>

        </div>
    );
}