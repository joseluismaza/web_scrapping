const comicsNCEuropaRouter = require("./nceuropa");
const librosNCRouter = require("./nclibros");
const comicsNormaRouter = require("./normacomics");
const comicsPaniniRouter = require("./paninicomics");

const mainRouter = requrie("express").Router();

mainRouter.use("/nceuropa", comicsNCEuropaRouter);
mainRouter.use("/nclibros", librosNCRouter);
mainRouter.use("/painicomics", comicsPaniniRouter);
mainRouter.use("/normacomics", comicsNormaRouter)

module.exports = mainRouter;