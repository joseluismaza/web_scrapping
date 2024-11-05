const { scrapperNorma } = require("./scrapperNorma");
const { scrapperPanini } = require("./scrapperPanini");
const { scrapperNormaEuropa } = require("./scrappernceuropa");
const { scrapperNormaLibros } = require("./scrappernclibros");


//se ejecuta la función scrapper
scrapperPanini("https://www.panini.es/shp_esp_es/comics.html");
scrapperNorma("https://www.normacomics.com/comics/comic-americano.html");
scrapperNormaEuropa("https://www.normacomics.com/novedades/novedades-europeo.html");
scrapperNormaLibros("https://www.normacomics.com/novedades/novedades-libros.html");