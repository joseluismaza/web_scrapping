
const NormaComicsEuropa = require("../../../NormaComicsEuropa.json");
const ComicsNCeuropa = require("../models/nceuropa");

const insertManyNCEuropa = async (req, res, next) => {
  try {
    await ComicsNCeuropa.insertMany(NormaComicsEuropa.results);
    return res.status(201).json("Todos los cómics subidos a la BBDD");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllNCEuropa = async (req, res, next) => {
  try {
    const allComicsNormaEuropa = await ComicsN.find();
    return res.status(200).json(allComicsNormaEuropa);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { insertManyNCEuropa, getAllNCEuropa };