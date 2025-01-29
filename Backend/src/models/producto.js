const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
        },
    precio: {
        type: Number,
        required: true,
        min: 0,
        },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
        },
    },
    {
    timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
