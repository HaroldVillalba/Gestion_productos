const Category = require('../models/categoria'); // Modelo de categoría

// Listar categorías
const listarCategorias = async (req, res) => {
    try {
    const categorias = await Category.find(); // Obtener todas las categorías
    res.status(200).json({ success: true, categorias });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error al listar las categorías', error: error.message });
    }
};

// Agregar una nueva categoría
const agregarCategoria = async (req, res) => {
    try {
    const { nombre, descripcion } = req.body;

    // Verificar si la categoría ya existe
    const categoriaExistente = await Category.findOne({ nombre });
    if (categoriaExistente) {
        return res.status(400).json({ success: false, message: 'La categoría ya existe' });
    }

    // Crear una nueva categoría
    const nuevaCategoria = new Category({ nombre, descripcion });
    const categoriaGuardada = await nuevaCategoria.save();

    res.status(201).json({ success: true, message: 'Categoría creada con éxito', categoria: categoriaGuardada });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error al agregar la categoría', error: error.message });
    }
};

// Editar una categoría
const editarCategoria = async (req, res) => {
    try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    // Actualizar la categoría
    const categoriaActualizada = await Category.findByIdAndUpdate(
        id,
        { nombre, descripcion },
      { new: true, runValidators: true } // Retorna la categoría actualizada y valida los campos
    );

    if (!categoriaActualizada) {
        return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }

    res.status(200).json({ success: true, message: 'Categoría actualizada con éxito', categoria: categoriaActualizada });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error al editar la categoría', error: error.message });
    }
};

// Eliminar una categoría
const eliminarCategoria = async (req, res) => {
    try {
    const { id } = req.params;

    const productosAsociados = await Product.find({ categoria: id });
    if (productosAsociados.length > 0) {
        return res.status(400).json({ success: false, message: 'No se puede eliminar la categoría porque tiene productos asociados' });
    }

    const categoriaEliminada = await Category.findByIdAndDelete(id);

    if (!categoriaEliminada) {
        return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
    }

    res.status(200).json({ success: true, message: 'Categoría eliminada con éxito' });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar la categoría', error: error.message });
    }
};

module.exports = {
    listarCategorias,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
};
