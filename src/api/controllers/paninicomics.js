const PaniniComics = require("../../../PaniniComics.json");
const ComicsP = require("../models/paninicomics");

const insertManyComicsPanini = async (req, res, next) => {
  try {
    await ComicsP.insertMany(PaniniComics.results)
    return res.status(201).json("Todos los libros subidos a la BBDD");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllComicsPanini = async (res, req, next) => {
  try {
    const allComicsPanini = await ComicsP.find();
    return res.status(200).json(allComicsPanini);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { insertManyComicsPanini, getAllComicsPanini };


// const insertManyLibros = async (req, res, next) => {
//   try {
//     await Libro.insertMany(libros.results);//pasar de JSON a un Array de objetos
//     return res.status(201).json("Todos los libros subidos a la BBDD");
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error);
//   }
// }

// const getAllLibros = async (req, res, next) => {
//   try {
//     const allLibros = await Libro.find();
//     return res.status(200).json(allLibros);
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// }

// module.exports = { insertManyLibros, getAllLibros };