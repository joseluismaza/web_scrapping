const { insertManyComicsNorma, getAllComicsNorma } = require("../controllers/normacomics");

const comicsNormaRouter = require("express").Router();

comicsNormaRouter.post("/obtencion_datos_norma", insertManyComicsNorma);
comicsNormaRouter.get("/", getAllComicsNorma);

module.exports = comicsNormaRouter;