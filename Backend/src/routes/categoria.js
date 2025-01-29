const express = require('express');
const router = express.Router();
const {
    listarCategorias,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
} = require('../controllers/categoria');

// Listar todas las categorías
router.get('/', listarCategorias);

// Agregar una nueva categoría
router.post('/', agregarCategoria);

// Editar una categoría existente
router.put('/:id', editarCategoria);

// Eliminar una categoría
router.delete('/:id', eliminarCategoria);

module.exports = router;
