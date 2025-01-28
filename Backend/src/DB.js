const mongoose = require('mongoose');

const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/productos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Salir del proceso si falla la conexión
}
};

module.exports = connectDB;
