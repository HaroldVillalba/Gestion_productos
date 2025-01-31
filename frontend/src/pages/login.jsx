import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../utils/login.css';

const Login = () => {
    // Estado para almacenar los valores de los campos
    const [correo, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (correo === '' || password === '') {
            setError('Por favor, ingrese ambos campos');
        } else {
            setError('');

            try {
            // Enviar las credenciales al backend
            const response = await axios.post('http://localhost:5000/api/usuarios/login', {
                correo,
                password
            });
    
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

            navigate("/productos");

            console.log(response.data);
            } catch (err) {
            // Si hay un error (credenciales incorrectas)
            setError('Correo o Contraseña incorrectas, Por favor vuelva a intentar');
            console.error(err);
            }
        }
    }
    return (
    <div className="login-container">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="correo">Correo:</label>
        <input
            type="text"
            id="correo"
            value={correo}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su correo"
        />
        </div>
        <div>
        <label htmlFor="password">Contraseña:</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
        />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar sesión</button>
        </form>
    </div>
    );
};

export default Login;
