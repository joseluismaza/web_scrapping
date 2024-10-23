const LibrosNC = require("../models/nclibros");
const LibrosNormaC = require("../../../LibrosNormaC.json")

const insertManyNCLibros = async (req, res, next) => {
  try {
    await LibrosNC.insertMany(LibrosNormaC.results);
    return res.status(201).json("Todos los libros subidos a la BBDD");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllNCLibros = async (req, res, next) => {
  try {
    const allLibrosNC = await LibrosNC.find();
    return res.status(200).json(allLibrosNC);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { insertManyNCLibros, getAllNCLibros };