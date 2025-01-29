const express = require('express');
const { registrarUsuario, login } = require('../controllers/usuarios');

const router = express.Router();

// Rutas para registrar y autenticar usuarios
router.post('/register', registrarUsuario);
router.post('/login', login);

module.exports = router;
