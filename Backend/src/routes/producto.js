const express = require('express');
const router = express.Router();
const {
    listarProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
} = require('../controllers/producto');

// Listar todos los productos
router.get('/list', listarProductos);

// Agregar un nuevo producto
router.post('/add', agregarProducto);

// Editar un producto existente
router.put('/:id/edit', editarProducto);

// Eliminar un producto
router.delete('/:id/delete', eliminarProducto);

module.exports = router;
