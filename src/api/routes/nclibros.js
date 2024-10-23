const { insertManyNCLibros, getAllNCLibros } = require("../controllers/nclibros");

const librosNCRouter = require("express").Router();

librosNCRouter.post("/obtencion_datos_normaL", insertManyNCLibros);
librosNCRouter.get("/", getAllNCLibros);

module.exports = librosNCRouter;