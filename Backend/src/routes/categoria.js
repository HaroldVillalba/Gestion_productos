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
router.get('/', verificarToken, listarCategorias);

// Agregar una nueva categoría
router.post('/', verificarToken, agregarCategoria);

// Editar una categoría existente
router.put('/:id', verificarToken, editarCategoria);

// Eliminar una categoría
router.delete('/:id', verificarToken, eliminarCategoria);

module.exports = router;
