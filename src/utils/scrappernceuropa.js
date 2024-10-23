const puppeteer = require("puppeteer");
const fs = require("fs");

const NCEuropaArray = [];

//Funciones del scrapper en el navegador
const scrapperNormaEuropa = async (url) => {
  console.log(url);
  //Abrir navegador
  const browser = await puppeteer.launch({ headless: false });
  //Abrir nueva página
  const page = await browser.newPage();
  //Depués ir a la página indicada
  await page.goto(url);
  //Cambiar tamaño página
  await page.setViewport({ width: 1080, height: 720 });
  //Repetir el proceso en cada página
  repeat(page, browser);
};
//Funciones para extraer los datos
const repeat = async (page, browser) => {
  //Extraer datos
  const arrayNormaEuropaDivs = await page.$$(".product-item-info"); //$$ se usa para seleccionar todos los divs

  //Recorrer cada elemento del array para extraer correctamente la información
  for (const comicsNCEuropaDivs of arrayNormaEuropaDivs) {
    let titulo;
    let precio;
    let img;
    let estado;

    //En caso de no tener ningún elemento
    try {
      titulo = await comicsNCEuropaDivs.$eval(".product-item-name", (el) => el.textContent.trim());//$eval, seleccionar + evaluar
      precio = await comicsNCEuropaDivs.$eval(".price", (el) => el.textContent.trim().slice(0, el.textContent.length - 1)); //trim para cortar los espacios
      img = await comicsNCEuropaDivs.$eval("img", (el) => el.src.trim());
      estado = await comicsNCEuropaDivs.$eval(".actions-primary", (el) => el.textContent.trim());

      const comicsEurpa = {
        titulo,//clave + valor es un shortcut tendria que ser titulo:titulo
        precio,
        img,
        estado,
      };
      //Escribir los datos en el array
      NCEuropaArray.push(comicsEurpa);
    } catch (error) {
      const comicsEurpa = {
        titulo,
        img,
        estado,
      };
      //Escribir los datos en el array
      NCEuropaArray.push(comicsEurpa);
    }
  }
  //Pasar a la siguiente página
  try {
    await page.$eval("[title='Siguiente']", (el) => el.click());//hacer click para pasar a la siguiente pagina
    await page.waitForNavigation();//Esperar a que navegue
    console.log(`Llevamos ${NCEuropaArray.length} datos recolectaods`);
    repeat(page, browser);
  } catch (error) {
    write(NCEuropaArray);
    await browser.close();//Cerrar el navegador al acabar
  }
};
//Función para escribir los datos en un archivo llamado comicsNorma.json
const write = (NCEuropaArray) => {
  fs.writeFile("NormaComicsEuropa.json", JSON.stringify(NCEuropaArray), () => {
    console.log("Archivo escrito");
  });
};
module.exports = { scrapperNormaEuropa };