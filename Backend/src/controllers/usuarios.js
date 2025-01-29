const User = require('../models/usuario');
const bcrypt = require('bcryptjs');

// Registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
    const { nombre, correo, password } = req.body;

    try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El correo ya está en uso' });
    }

    // Crear un nuevo usuario
    const usuario = new User({ nombre, correo, password });
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario', error });
    }
};

// Autenticar un usuario
const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
    // Buscar el usuario por correo
    const usuario = await User.findOne({ correo });
    if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({ mensaje: 'Autenticación exitosa' });
    } catch (error) {
    res.status(500).json({ mensaje: 'Error al autenticar el usuario', error });
    }
};

module.exports = { registrarUsuario, login };
