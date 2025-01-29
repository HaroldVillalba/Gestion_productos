const Product = require('../models/producto'); // Modelo de producto
const Category = require('../models/categoria'); // Modelo de categoría

// Listar productos con categorías
const listarProductos = async (req, res) => {
    try {
    const productos = await Product.find().populate('categoria', 'nombre descripcion'); // Cargar categoría relacionada
    res.status(200).json({ success: true, productos });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error al listar los productos', error: error.message });
    }
};

// Agregar un producto
const agregarProducto = async (req, res) => {
    try {
    const { nombre, descripcion, precio, categoria, cantidad } = req.body;

    // Verificar si la categoría existe
    const categoriaExistente = await Category.findById(categoria);
    if (!categoriaExistente) {
        return res.status(400).json({ success: false, message: 'La categoría proporcionada no existe' });
    }

    // Crear un nuevo producto
    const nuevoProducto = new Product({ nombre, descripcion, precio, categoria, cantidad });
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json({ success: true, message: 'Producto agregado con éxito', producto: productoGuardado });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error al agregar el producto', error: error.message });
    }
};

// Editar un producto
const editarProducto = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, cantidad } = req.body;

    // Verificar si la categoría existe (si se proporciona una nueva categoría)
    if (categoria) {
        const categoriaExistente = await Category.findById(categoria);
        if (!categoriaExistente) {
        return res.status(400).json({ success: false, message: 'La categoría proporcionada no existe' });
        }
    }

    // Actualizar el producto
    const productoActualizado = await Product.findByIdAndUpdate(
        id,
        { nombre, descripcion, precio, categoria, cantidad },
      { new: true, runValidators: true } // Retorna el producto actualizado y valida los campos
    );

    if (!productoActualizado) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.status(200).json({ success: true, message: 'Producto actualizado con éxito', producto: productoActualizado });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error al editar el producto', error: error.message });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    try {
    const { id } = req.params;

    const productoEliminado = await Product.findByIdAndDelete(id);

    if (!productoEliminado) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    res.status(200).json({ success: true, message: 'Producto eliminado con éxito' });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el producto', error: error.message });
    }
};

module.exports = {
    listarProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
};
