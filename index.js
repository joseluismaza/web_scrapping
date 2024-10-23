require("dotenv").config();
const { connectDB } = require("./src/config/db");
const express = require("express");
const cors = require("cors");
const mainRouter = require("./src/api/routes/main");

const app = express();
connectDB();
app.use(cors());

app.use("/api/v1", mainRouter);


app.use("*", (req, res, next) => {
  return res.status(404).json("Ruta no encontrada");
})

app.listen(3000, () => {
  console.log("http://localhost:3000");
})

console.log("Iniciada la recopilación de datos");