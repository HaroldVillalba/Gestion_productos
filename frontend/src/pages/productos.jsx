import { useState, useEffect } from "react";
import axios from "axios";
import '../utils/login.css';
import Header from '../components/header';

export default function AddProduct() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoria, setCategoria] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [editando, setEditando] = useState(false);
    const [productoId, setProductoId] = useState(null);

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
        cargarProductos();
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

    const cargarProductos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/productos/list");
            setProductos(response.data.productos);
        } catch (error) {
            console.error("Error al cargar productos", error);
            setMensaje("Error al cargar productos");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editando) {
                await axios.put(`http://localhost:5000/api/productos/${productoId}/edit`, {
                    nombre,
                    descripcion,
                    precio,
                    categoria,
                    cantidad
                });
                setMensaje("Producto actualizado correctamente");
            } else {
                await axios.post("http://localhost:5000/api/productos/add", {
                    nombre,
                    descripcion,
                    precio,
                    categoria,
                    cantidad
                });
                setMensaje("Producto agregado correctamente");
            }

            limpiarFormulario();
            cargarProductos();
        } catch (error) {
            setMensaje(error.response?.data?.message || "Error al procesar la solicitud");
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCategoria("");
        setCantidad("");
        setEditando(false);
        setProductoId(null);
    };

    const handleEditar = (producto) => {
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecio(producto.precio);
        setCategoria(producto.categoria._id);
        setCantidad(producto.cantidad);
        setEditando(true);
        setProductoId(producto._id);
    };

    const handleEliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/productos/${id}/delete`);
            setMensaje("Producto eliminado correctamente");
            cargarProductos();
        } catch (error) {
            setMensaje("Error al eliminar el producto");
        }
    };

    return (
        <div>
            {isLoggedIn && <Header />}

            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                {/* Formulario para agregar/editar productos */}
                <div style={{ width: "40%", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h2 style={{ textAlign: "center" }}>{editando ? "Editar Producto" : "Agregar Producto"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
                    
                        <label>Descripción</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
                        
                        <label>Precio</label>
                        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
                        
                        <label>Categoría</label>
                        <select 
                            value={categoria} 
                            onChange={(e) => setCategoria(e.target.value)} 
                            required 
                            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.nombre}</option>
                            ))}
                        </select>
                        
                        <label>Cantidad</label>
                        <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
                        
                        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: editando ? "green" : "blue", color: "white", border: "none", borderRadius: "4px" }}>
                            {editando ? "Actualizar Producto" : "Agregar Producto"}
                        </button>
                    </form>
                    {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}
                </div>

                {/* Tabla de productos */}
                <div style={{ width: "55%", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h2 style={{ textAlign: "center" }}>Lista de Productos</h2>
                    {productos.length > 0 ? (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#ddd", textAlign: "left" }}>
                                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Nombre</th>
                                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Descripción</th>
                                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Precio</th>
                                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Categoría</th>
                                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Cantidad</th>
                                    <th style={{ padding: "8px", border: "1px solid #ccc" }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto) => (
                                    <tr key={producto._id}>
                                        <td style={{ padding: "8px", border: "1px solid #ccc" }}>{producto.nombre}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>${producto.precio}</td>
                                        <td>{producto.categoria.nombre}</td>
                                        <td>{producto.cantidad}</td>
                                        <td>
                                            <button onClick={() => handleEditar(producto)}>Editar</button>
                                            <button onClick={() => handleEliminar(producto._id)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px", borderRadius: "4px" }}>Eliminar</button>                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay productos disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
}
