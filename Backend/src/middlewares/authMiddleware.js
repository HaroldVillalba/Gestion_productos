const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado, no se encontró el token' });
    }

    try {
        // Verificar el token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ mensaje: 'Falta la clave secreta de JWT' });
        }

        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no válido o expirado' });
    }
};

module.exports = { verificarToken };
