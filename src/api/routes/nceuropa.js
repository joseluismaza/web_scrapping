const { getAllNCEuropa, insertManyNCEuropa } = require("../controllers/nceuropa");
const comicsNCEuropaRouter = require("express").Router();

comicsNCEuropaRouter.post("/obtencion_datos_normaL", insertManyNCEuropa);
comicsNCEuropaRouter.get("/", getAllNCEuropa);

module.exports = comicsNCEuropaRouter;