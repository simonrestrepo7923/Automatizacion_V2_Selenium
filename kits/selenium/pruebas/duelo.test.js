const assert = require('node:assert/strict');
const { By, until, Key } = require('selenium-webdriver');
const { BASE_URL, crearDriver } = require('../soporte/driver');
 
/**
 * Selenium + Mocha · los tres criterios del duelo.
 */
describe('Duelo · tres criterios de aceptación', function () {
  let driver;
 
  // Selenium no trae ejecutor: hay que abrir y cerrar el navegador a mano, en cada prueba.
  beforeEach(async () => {
    driver = await crearDriver();
  });
  afterEach(async () => {
    await driver.quit();
  });
 
  // ------------------------------------------------------------------ EJEMPLO RESUELTO
  it('US-01 CA1: el catálogo muestra 8 productos', async () => {
    await driver.get(BASE_URL);
    // Selenium no espera por ti: hay que esperar a mano a que existan los elementos.
    await driver.wait(until.elementLocated(By.css('h3')), 5000);
 
    const productos = await driver.findElements(By.css('h3'));
    assert.equal(productos.length, 8);
  });
 
  // ------------------------------------------------------------------  US-04 CA2
  it('US-04 CA2: no deja agregar 7 mochilas de una vez (stock 6) y avisa', async () => {
    // Dado   un producto con stock 6 (la Mochila escolar),
    await driver.get(BASE_URL);
    const tarjeta = await driver.wait(
      until.elementLocated(
        By.xpath("//h3[normalize-space()='Mochila escolar']/ancestor::div[contains(@class,'rounded-lg')][1]")
      ),
      5000
    );
 
    // Cuando intento agregar 7 unidades de una vez,
    const cantidad = await tarjeta.findElement(By.css('input[type=number]'));
    await cantidad.sendKeys(Key.chord(Key.CONTROL, 'a'), '7'); // reemplaza el 1 que ya trae
    assert.equal(await cantidad.getAttribute('value'), '7'); // comprueba que quedó 7 y no 17
    await tarjeta.findElement(By.xpath(".//button[normalize-space()='Agregar']")).click();
 
    // Entonces veo un aviso con el stock disponible...
    await driver.wait(until.alertIsPresent(), 5000);
    const aviso = await driver.switchTo().alert();
    const texto = await aviso.getText();
    await aviso.accept();
    assert.match(texto, /Solo hay 6 unidades/);
 
    // ...y no se agrega nada.
    const vacio = await driver.findElements(By.xpath("//*[normalize-space()='Tu carrito está vacío.']"));
    assert.equal(vacio.length > 0, true, 'El carrito debería seguir vacío');
  });
 
  // ------------------------------------------------------------------ TU TURNO · US-09 CA1
  it('US-09 CA1: DESC10 descuenta el 10 % del subtotal', async () => {
    // Dado   un carrito con productos (1 Mochila escolar, $ 65.000),
    await driver.get(BASE_URL);
    const tarjeta = await driver.wait(
      until.elementLocated(
        By.xpath("//h3[normalize-space()='Mochila escolar']/ancestor::div[contains(@class,'rounded-lg')][1]")
      ),
      5000
    );
    await tarjeta.findElement(By.xpath(".//button[normalize-space()='Agregar']")).click();
 
    // Cuando aplico el código DESC10,
    const codigo = await driver.wait(until.elementLocated(By.css("input[placeholder='Código de descuento']")), 5000);
    await codigo.sendKeys('DESC10');
    await driver.findElement(By.xpath("//button[normalize-space()='Aplicar']")).click();
 
    // Entonces el descuento es el 10 % del subtotal: $ 6.500.
    // React dibuja la fila «Descuento» después del clic: hay que esperarla.
    const descuento = await driver.wait(
      until.elementLocated(By.xpath("//dt[starts-with(normalize-space(),'Descuento')]/following-sibling::dd")),
      5000
    );
    const valor = await descuento.getText();
    assert.match(valor, /6\.500/);
  });
});
 