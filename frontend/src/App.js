import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Productos from "./pages/productos";
import Categorias from "./pages/categorias";
import Registro from "./pages/registro";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/usuarios" element={<Registro />} />
            </Routes>
        </Router>
    );
}

export default App;
