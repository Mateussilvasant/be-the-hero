import React from 'react';
import './styles.css';

import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import {useState} from 'react'
import api from '../../services/api';



export default function NewIncident(){

    const [titulo,setTitulo] = useState("");
    const [descricao,setDescricao] = useState("");
    const [valor,setValor] = useState("");

    const ongId = localStorage.getItem("ongId");

    const history = useHistory();

    async function handleNovoIncidente(e){
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            valor,
        };
        
        try{
            await api.post('incidents',data,{
                headers :{
                    Authorization : ongId
                }
            });

            history.push("/perfil");

        }catch(err){
            alert("Não foi possível cadastrar o caso...");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/perfil">
                        <FiArrowLeft size={20} color="#E02041"  />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNovoIncidente}>
                    <input placeholder="Título do caso" value={titulo} onChange={e => setTitulo(e.target.value)}/>
                    <textarea  placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    <input placeholder="Valor em reais" value={valor} onChange={e => setValor(e.target.value)}/>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}
