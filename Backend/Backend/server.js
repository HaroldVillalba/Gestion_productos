const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./DB');

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
