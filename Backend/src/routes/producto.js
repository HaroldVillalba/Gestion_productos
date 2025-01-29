const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const {
    listarProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
} = require('../controllers/producto');

router.get('/list', verificarToken, listarProductos);

router.post('/add', verificarToken, agregarProducto);

router.put('/:id/edit', verificarToken, editarProducto);

router.delete('/:id/delete', verificarToken, eliminarProducto);

module.exports = router;
