const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo válido'],
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
