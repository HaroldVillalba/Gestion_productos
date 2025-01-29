const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    },
    {
    timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
