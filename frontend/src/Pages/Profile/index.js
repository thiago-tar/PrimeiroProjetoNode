import React, { useEffect, useState } from 'react';
import logoIgm from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/api'

export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('perfil', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidente/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.Id !== id))

        } catch (error) {
            alert('Erro ao deletar caso.');
        }
    }

    async function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoIgm} alt="Be The Hero" />
                <span>Bem Vinda, {ongNome}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.Id}>
                        <strong>CASO:</strong>
                        <p>{incident.Titulo}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.Descricao}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.valor)}</p>

                        <button onClick={() => handleDeleteIncident(incident.Id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    );
}