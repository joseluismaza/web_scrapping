const puppeteer = require("puppeteer");
const fs = require("fs");

const paniniArray = [];

let modalsCookie = false;
//Funciones del scrapper en el navegador
const scrapperPanini = async (url) => {
  console.log(url);
  //Abrir navegador
  const browser = await puppeteer.launch({ headless: false });
  //Abrir nueva página
  const page = await browser.newPage();
  //Después ir a la página indicada
  await page.goto(url);
  //Cambiar tamaño página
  await page.setViewport({ width: 1080, height: 720 });
  //Aceptar cookies
  if (!modalsCookie) {
    try {
      await page.waitForSelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll', { timeout: 5000 });
      await page.click('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
      modalsCookie = true;
      console.log("Cookies Aceptadas");
    } catch (error) {
      console.log("No se encontraron las cookies o ya fueron aceptadas");
    }
  }
  //repetir el proceso en cada página
  repeat(page, browser);
};
//Función para extraer los datos
const repeat = async (page, browser) => {
  //Extraer datos
  const paniniDivs = await page.$$(".product-item-info"); //$$ se usa para seleccionar todos los divs

  //Recorrer cada elemento del array para extraer correctamente la información
  for (const paniniComicsDivs of paniniDivs) {
    //Declarar los elementos a rastrear
    let titulo;
    let precio;
    let img;
    let categoria;

    //En caso de no tener ningún elemento
    try {
      titulo = await paniniComicsDivs.$eval(".product-item-name", (el) => el.textContent.trim());//$eval, seleccionar + evaluar;
      precio = await paniniComicsDivs.$eval(".price", (el) => el.textContent.trim().slice(0, el.textContent.length - 1)); //trim para cortar los espacios
      img = await paniniComicsDivs.$eval("img", (el) => el.src.trim());
      categoria = await paniniComicsDivs.$eval(".product-item-attribute-typology", (el) => el.textContent.trim());
      const libros = {
        titulo, //clave + valor es un shortcut tendria que ser titulo:titulo
        precio,
        img,
        categoria,
      };
      //escribir los datos en el array
      paniniArray.push(libros);
    } catch (error) {
      const libros = {
        titulo,
        stock: false, //en caso de que no haya precio, se marcará cómo fuera de stock (modelo)
        img,
        categoria,
      };
      paniniArray.push(libros);
    }
  }
  //Pasar al siguiente página
  try {
    await page.$eval("[title='Siguiente']", (el) => el.click());//hacer click para pasar a la siguiente pagina
    await page.waitForNavigation();//esperar a que navegue
    console.log(`Llevamos ${paniniArray.length} datos recolectados`);
    repeat(page, browser);
  } catch (error) {
    write(paniniArray);
    await browser.close(); //cerra el navegador al acabar
  }
};
//Función para escribir los datos en un archivo llamado comics.json
const write = (paniniArray) => {
  fs.writeFile("PaniniComics.json", JSON.stringify(paniniArray), () => {
    console.log("Archivo escrito");
  });
};
module.exports = { scrapperPanini };
