const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./DB');
const cors = require('cors');
const userRoutes = require('./routes/usuario');
const productRoutes = require('./routes/producto');
const categoryRoutes = require('./routes/categoria');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/categorias', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
