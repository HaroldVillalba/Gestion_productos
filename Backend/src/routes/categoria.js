const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const {
    listarCategorias,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
} = require('../controllers/categoria');

// Listar todas las categorías
router.get('/list', verificarToken, listarCategorias);

// Agregar una nueva categoría
router.post('/add', verificarToken, agregarCategoria);

// Editar una categoría existente
router.put('/update/:id', verificarToken, editarCategoria);

// Eliminar una categoría
router.delete('/:id/delete', verificarToken, eliminarCategoria);

module.exports = router;
