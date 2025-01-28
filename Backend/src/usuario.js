const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'], // Mensaje personalizado para required
        unique: true,
        lowercase: true, // Convierte el correo a minúsculas automáticamente
        validate: {
            validator: (correo) => validator.isEmail(correo), // Usa validator.js para validar el correo
            message: 'Por favor ingrese un correo válido', // Mensaje de error si la validación falla
            },
        },
    password: {
        type: String,
        required: true,
    },
    },
    {
    timestamps: true,
    }
);



const User = mongoose.model('User', userSchema);

module.exports = User;
