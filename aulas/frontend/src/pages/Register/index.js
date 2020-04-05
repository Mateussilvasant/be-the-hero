import React from 'react';
import {useState} from 'react';
import './styles.css';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api';


export default function Register(){

    const[nome,setNome] = useState('');
    const[email,setEmail] = useState('');
    const[whatsapp,setWhatsapp] = useState('');
    const[cidade,setCidade] = useState('');
    const[uf,setUF] = useState('');    

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        };

        const resposta = await api.post('ongs',data);

        try{
            alert(`Seu ID de acesso ${resposta.data.id}`);
            history.push('/');

        }catch(err){
            alert(`N?o foi poss?vel cadastrar a ONG, tente novamente...`); 
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Fa?a seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={20} color="#E02041"  />
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da ONG"/>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>

                    <div class="input-group">
                        <input placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                        <input placeholder="UF" style={{width: 80}} value={uf} onChange={e => setUF(e.target.value)}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}
