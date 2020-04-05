import React from 'react';
import {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import './styles.css';

import heroesimg from "../../assets/heroes.png";
import logoimg from '../../assets/logo.svg';

import api from '../../services/api';



export default function Logon(){

    const [id,setID] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const resp = await api.post('sessions',{id});
           
            localStorage.setItem('ongId',id);
            localStorage.setItem("ongNome",resp.data.nome);

            history.push('/perfil');

        }catch(err){
            alert('Falha ao realizar o Login...');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
            <img src={logoimg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID" value={id} onChange={e => setID(e.target.value)}/>                    
                    <button className="button">Entrar</button>
                    <Link className="back-link" to="/cadastrar">
                        <FiLogIn size={20} color="#E02041"  />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesimg} alt="Heroes"/>
        </div>
    );
}