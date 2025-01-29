const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); 

const userSchema = mongoose.Schema(
    {
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        lowercase: true,
        validate: {
            validator: (correo) => validator.isEmail(correo),
            message: 'Por favor ingrese un correo válido',
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
