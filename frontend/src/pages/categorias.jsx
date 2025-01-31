import { useState, useEffect } from "react";
import axios from "axios";
import Header from '../components/header';

export default function Categorias() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [editando, setEditando] = useState(false);
    const [categoriaId, setCategoriaId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            setIsLoggedIn(false);
            delete axios.defaults.headers.common["Authorization"];
        }

        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/categorias/list");
            setCategorias(response.data.categorias);
        } catch (error) {
            console.error("Error al cargar categorías", error);
            setMensaje("Error al cargar categorías");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editando) {
                await axios.put(`http://localhost:5000/api/categorias/update/${categoriaId}`, {
                    nombre,
                    descripcion
                });
                setMensaje("Categoría actualizada correctamente");
            } else {
                await axios.post("http://localhost:5000/api/categorias/add", {
                    nombre,
                    descripcion
                });
                setMensaje("Categoría agregada correctamente");
            }

            limpiarFormulario();
            cargarCategorias();
        } catch (error) {
            setMensaje(error.response?.data?.message || "Error al procesar la solicitud");
        }
    };

    const handleEliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/categorias/${id}/delete`);
            setMensaje("Categoría eliminada correctamente");
            cargarCategorias();
        } catch (error) {
            setMensaje("Error al eliminar la categoría");
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setDescripcion("");
        setEditando(false);
        setCategoriaId(null);
    };

    const handleEditar = (categoria) => {
        setNombre(categoria.nombre);
        setDescripcion(categoria.descripcion);
        setEditando(true);
        setCategoriaId(categoria._id);
    };

    return (
        <div>
            {isLoggedIn && <Header />}

            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                {/* Formulario para agregar/editar categorías */}
                <div style={{ width: "35%", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h2 style={{ textAlign: "center" }}>{editando ? "Editar Categoría" : "Agregar Categoría"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
                    
                        <label>Descripción</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

                        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: editando ? "green" : "blue", color: "white", border: "none", borderRadius: "4px" }}>
                            {editando ? "Actualizar Categoría" : "Agregar Categoría"}
                        </button>
                    </form>
                    {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}
                </div>

                {/* Cuadrícula de categorías */}
                <div style={{ width: "60%", padding: "20px" }}>
                    <h2 style={{ textAlign: "center" }}>Lista de Categorías</h2>
                    {categorias.length > 0 ? (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "15px"
                        }}>
                            {categorias.map((categoria) => (
                                <div key={categoria._id} style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "15px",
                                    textAlign: "center",
                                    backgroundColor: "#f9f9f9",
                                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)"
                                }}>
                                    <h3>{categoria.nombre}</h3>
                                    <p>{categoria.descripcion}</p>
                                    <button onClick={() => handleEditar(categoria)} style={{
                                        marginRight: "5px",
                                        backgroundColor: "orange",
                                        color: "white",
                                        border: "none",
                                        padding: "5px",
                                        borderRadius: "4px",
                                        cursor: "pointer"
                                    }}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleEliminar(categoria._id)} style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "5px",
                                        borderRadius: "4px",
                                        cursor: "pointer"
                                    }}>
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No hay categorías disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
}
