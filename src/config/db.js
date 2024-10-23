const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conexión establecida");
  } catch (error) {
    console.log("Ha fallado la conexión");
  }
}

module.exports = { connectDB };