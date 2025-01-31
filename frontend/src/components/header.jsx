import { Link, useNavigate } from "react-router-dom";
import '../utils/header.css';  // Importamos los estilos

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Elimina el token de autenticación
        navigate("/login"); // Redirige al login
    };

    return (
        <header className="header">
            <div className="navbar">
                <h1>Mi Tienda</h1>
                <ul>
                    <li>
                        <Link to="/productos">Productos</Link>
                    </li>
                    <li>
                        <Link to="/categorias">Categorías</Link>
                    </li>
                    <li>
                        <Link to="/usuarios">Usuarios</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
