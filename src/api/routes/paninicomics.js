const { getAllComicsPanini, insertManyComicsPanini } = require("../controllers/paninicomics");
const comicsPaniniRouter = require("express").Router();

comicsPaniniRouter.post("/obtencion_datos", insertManyComicsPanini);
comicsPaniniRouter.get("/", getAllComicsPanini);

module.exports = comicsPaniniRouter;