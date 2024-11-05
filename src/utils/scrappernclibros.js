const puppeteer = require("puppeteer");
const fs = require("fs");

const NCLibrosArray = [];
let modalCookies = false;

//Funciones del scrapper en el navegador
const scrapperNormaLibros = async (url) => {
  console.log(url);
  //Abrir navegador
  const browser = await puppeteer.launch({ headless: false });
  //Abrir nueva página
  const page = await browser.newPage();
  //Depués ir a la página indicada
  await page.goto(url);
  //Cambiar tamaño página
  await page.setViewport({ width: 1080, height: 720 });
  //Aceptar Cookies
  if (!modalCookies) {
    try {
      await page.waitForSelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll', { timeout: 5000 });
      await page.click('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
      console.log("Cookies Aceptadas");
    } catch (error) {
      console.log("No se encontraron las cookies o ya fueron aceptadas");
    }
  }
  //Repetir el proceso en cada página
  repeat(page, browser);
};
//Funciones para extraer los datos
const repeat = async (page, browser) => {
  //Extraer datos
  const arrayNormaLibros = await page.$$(".product-item-info"); //$$ se usa para seleccionar todos los divs

  //Recorrer cada elemento del array para extraer correctamente la información
  for (const librosNCDivs of arrayNormaLibros) {
    let titulo;
    let precio;
    let img;
    let estado;

    //En caso de no tener ningún elemento
    try {
      titulo = await librosNCDivs.$eval(".product-item-name", (el) => el.textContent.trim());//$eval, seleccionar + evaluar
      precio = await librosNCDivs.$eval(".price", (el) => el.textContent.trim().slice(0, el.textContent.length - 1)); //trim para cortar los espacios
      img = await librosNCDivs.$eval("img", (el) => el.src.trim());
      estado = await librosNCDivs.$eval(".actions-primary", (el) => el.textContent.trim());

      const librosNormaC = {
        titulo,//clave + valor es un shortcut tendria que ser titulo:titulo
        precio,
        img,
        estado,
      };
      //Escribir los datos en el array
      NCLibrosArray.push(librosNormaC);
    } catch (error) {
      const librosNormaC = {
        titulo,
        img,
        estado,
      };
      //Escribir los datos en el array
      NCLibrosArray.push(librosNormaC);
    }
  }
  //Pasar a la siguiente página
  try {
    await page.$eval("[title='Siguiente']", (el) => el.click());//hacer click para pasar a la siguiente pagina
    await page.waitForNavigation();//Esperar a que navegue
    console.log(`Llevamos ${NCLibrosArray.length} datos recolectaods`);
    repeat(page, browser);
  } catch (error) {
    write(NCLibrosArray);
    await browser.close();//Cerrar el navegador al acabar
  }
};
//Función para escribir los datos en un archivo llamado comicsNorma.json
const write = (NCLibrosArray) => {
  fs.writeFile("LibrosNormaC.json", JSON.stringify(NCLibrosArray), () => {
    console.log("Archivo escrito");
  });
};
module.exports = { scrapperNormaLibros };