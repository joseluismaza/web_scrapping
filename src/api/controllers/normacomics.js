const ComicsN = require("../models/normacomics");
const NormaComics = require("../../../NormaComics.json");

const insertManyComicsNorma = async (req, res, next) => {
  try {
    await ComicsN.insertMany(NormaComics.results);
    return res.status(201).json("Todos los cómics subidos a la BBDD");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllComicsNorma = async (req, res, next) => {
  try {
    const allComicsNorma = await ComicsN.find();
    return res.status(200).json(allComicsNorma);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { insertManyComicsNorma, getAllComicsNorma };