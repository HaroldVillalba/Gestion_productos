import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";

export default function Register() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verificar si hay un token almacenado para determinar si el usuario está autenticado
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Si hay un token, el usuario está autenticado
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/usuarios/register", {
                nombre,
                correo,
                password
            });

            setMensaje(response.data.message || "Usuario registrado con éxito");
            setNombre("");
            setCorreo("");
            setPassword("");
        } catch (error) {
            setMensaje(error.response?.data?.message || "Error al registrar usuario");
        }
    };

    return (
        <div>
            {/* Mostrar el Header solo si el usuario ha iniciado sesión */}
            {isLoggedIn && <Header />}

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div style={{ width: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h2 style={{ textAlign: "center" }}>Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input 
                            type="text" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                            style={{ width: "100%", padding: "8px", marginBottom: "10px" }} 
                        />

                        <label>Correo</label>
                        <input 
                            type="email" 
                            value={correo} 
                            onChange={(e) => setCorreo(e.target.value)} 
                            required 
                            style={{ width: "100%", padding: "8px", marginBottom: "10px" }} 
                        />

                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={{ width: "100%", padding: "8px", marginBottom: "10px" }} 
                        />

                        <button type="submit" 
                            style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px" }}>
                            Registrarse
                        </button>
                    </form>
                    {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}
                </div>
            </div>
        </div>
    );
}
