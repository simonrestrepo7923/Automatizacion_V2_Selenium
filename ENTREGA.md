# Entrega · Duelo de herramientas

**Equipo:** Selenium-E4  
**Integrantes:** Simon Restrepo aristizabal 
**Repositorio:** https://github.com/simonrestrepo7923/Automatizacion_V2_Selenium  
**Herramienta que nos tocó:** ☒ Selenium + Mocha &nbsp; ☐ Cypress &nbsp; ☐ Playwright + Cucumber  
**Escenario que nos tocó:** E4 · Agencia Pixel

> Completa este archivo a medida que avanzas (cada sección dice en qué parte de la guía se llena).
> Lo que se mide con números lo guarda el medidor en `medidas.json`; aquí va lo que un número no dice.
> Escribe con tus palabras: las respuestas copiadas de la guía, de otro equipo o de un asistente sin pasar por tu criterio no cuentan.

Archivos que entregan, todos en el repositorio y con `git push`:

| Archivo | Quién lo escribe | Parte |
|---|---|---|
| `ENTREGA.md` (este) | ustedes | 1 a 6 |
| `autoinforme.json` | ustedes (minutos y diagnóstico) | 2 a 4 |
| `medidas.json` y `medidas-control.json` | los genera el medidor (`npm run medir`) | 4 |
| `MATRIZ.md` | ustedes | 5 |
| `ADR.md` | ustedes | 6 |
| Las pruebas de su kit (las tres historias) | ustedes | 1 a 3 |

---

## 1. Qué hace la herramienta por nosotros (Parte 1)

| Tarea | ¿Quién la hace? | ¿Dónde lo vemos? (archivo y línea) |
|---|---|---|
| Abrir el navegador y cerrarlo al terminar | Nuestro código. Escribimos las instrucciones para abrir y cerrar Chrome en cada prueba. | `pruebas/duelo.test.js`, líneas 12 a 17; `soporte/driver.js`, línea 9 |
| Esperar a que el elemento exista o se pueda usar | Nuestro código. Selenium no espera automáticamente; debemos indicarle que espere. | `pruebas/duelo.test.js`, línea 23 |
| Reintentar una comprobación que todavía no se cumple | Nadie. Si la comprobación falla, la prueba falla inmediatamente y no se vuelve a intentar. | `pruebas/duelo.test.js`, línea 26 |
| Ejecutar las pruebas, contarlas y decir cuántas pasaron | Mocha, una librería adicional. Ejecuta las pruebas y muestra resultados como `3 passing`. | `package.json` y `.mocharc.json` |
| Comprobar un valor y mostrar «esperado» y «recibido» | `assert`, una librería incluida en Node.js. Comprueba si los valores son correctos y muestra las diferencias. | `pruebas/duelo.test.js`, líneas 1 y 26 |
| Leer el texto de un `alert()` del navegador *(lo descubren en la Parte 2)* | Selenium lee el mensaje, pero nuestro código configura Chrome para evitar que la ventana se cierre automáticamente. | `soporte/driver.js`, líneas 14 a 16; `pruebas/duelo.test.js`, líneas 47 a 51 |
| Dejar evidencia (captura, video o traza) cuando una prueba falla | Nadie. Si una prueba falla, no se guarda ninguna captura ni video. | Esta función no aparece en `duelo.test.js` ni en `driver.js`. |

> _Respuesta:_ Selenium es una librería: nosotros la llamamos para controlar el navegador, y las demás tareas las hacen Mocha, `assert` y el código que escribimos. Un framework, en cambio, nos llama a nosotros y ya trae incluido cómo ejecutar, esperar y comprobar.



## 2. Bitácora de las historias (Partes 2 y 3)

| | US-04 CA2 (7 mochilas, stock 6) | US-09 CA1 (DESC10) |
|---|---|---|
| Minutos hasta el verde | 20 | 15 |
| Primer intento que **no** funcionó: qué escribimos y qué dijo la herramienta | Partimos de un código hecho con ayuda de un asistente y funcionó a la primera. Cuando la dañamos a propósito, escribimos sin querer `npm test` dentro del código y la prueba falló porque el texto no coincidía. | Funcionó a la primera. Cuando cambiamos a propósito `6.500` por `9.999`, falló como debía. |
| Mensaje de error que nos ayudó (o que nos confundió) | Nos ayudó: el error decía qué esperaba («5 unidades»), qué recibió («6 unidades») y en qué línea falló (51). Nos confundió: las líneas `DevTools listening…`, que parecen errores pero no lo son. | Nos ayudó: el error mostró el valor real de la página (`$ 6.500`) junto al que esperábamos (`9.999`). |
| Qué tuvimos que buscar en la documentación (enlace) | Cómo funciona Selenium: https://www.selenium.dev/documentation/ y el video https://www.youtube.com/watch?v=b163U9tGzfY | Las mismas fuentes y las pistas del archivo de pruebas. |
| Qué haría distinto un equipo con más experiencia en esta herramienta | No repetiría el código para buscar la mochila; lo escribiría una sola vez y lo usaría en las dos pruebas. | Lo mismo: escribiría una sola vez la búsqueda de la mochila y la espera. |

**Lo más distinto frente a US-01 CA1:**

> _Respuesta:_ La primera prueba solo consistía en esperar y contar los productos. En la prueba de las mochilas, tuvimos que esperar el mensaje emergente (alert), pasar a el, leerlo y cerrarlo. Además, como había ocho botones «Agregar» iguales, fue necesario buscar el que estaba dentro de la tarjeta de la mochila. En la prueba del descuento, tuvimos que esperar a que apareciera la fila «Descuento» después de presionar «Aplicar» para poder leer su valor.

## 3. Lo que medimos (Parte 4)

Resumen de nuestro kit (Selenium + Mocha):

```text
Velocidad ......... mediana 9.43 s  (mínimo 8.67 · máximo 10.32)
Estabilidad ....... 10 de 10 corridas completas
Código ............ 57 líneas de pruebas + 16 de soporte = 73
selenium-webdriver. 4.51.0 instalada · última publicación hace 18 días (v4.51.0)
mocha.............. 12.0.3 instalada · última publicación hace 26 días (v12.0.3)
Autoinforme ....... minutos {"instalacion":10,"ca2":20,"ca3":15}, diagnóstico 3/5
```

Resumen de la herramienta de comparación (Playwright Test):

```text
Velocidad ......... mediana 9.45 s  (mínimo 8.85 · máximo 11.41)
Estabilidad ....... 10 de 10 corridas completas
Código ............ 34 líneas de pruebas + 14 de soporte = 48
@playwright/test... 1.64.1 instalada · última publicación hace 13 días (v1.64.1)
```

- Mediana de nuestro kit: **9,43 s** · Mediana de la herramienta de comparación en **nuestro** computador: **9,45 s** · **Relación de velocidad** (kit ÷ control): **1,00**
- Ejecuciones completas de nuestro kit: **10 de 10**
- Líneas de código (pruebas + soporte): **73**
- Puntos de diagnóstico obtenidos (de 5): **3**

**El error provocado a propósito.** Cambiamos el número 8 por el 9 en la prueba de los productos (`duelo.test.js`, línea 26). Esto fue lo que mostró:

```text
1) Duelo · tres criterios de aceptación
     US-01 CA1: el catálogo muestra 8 productos:
   AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
8 !== 9
   + expected - actual
   -8
   +9
   at Context.<anonymous> (pruebas\duelo.test.js:26:12)
```

El mensaje fue útil porque indicó el nombre de la prueba, el valor esperado (9), el valor recibido (8) y la línea donde ocurrió el error (26). Sin embargo, nos faltó una captura de pantalla en ese momento para ver qué aparecía en la página.

| Pregunta (campo en `autoinforme.json`) | ¿Sí o no? | ¿De dónde vino? |
|---|:---:|---|
| ¿El mensaje indica **qué** falló (el elemento o la comprobación), sin tener que adivinar? (`diceQueFallo`) | Sí | De `assert` de Node y de Mocha (librerías utilizadas en el kit) |
| ¿Muestra el valor **esperado** y el **recibido**? (`esperadoYRecibido`) | Sí | De `assert` de Node |
| ¿Indica la **línea de nuestra prueba** donde ocurrió el error? (`lineaDeLaPrueba`) | Sí | De Node y Mocha |
| ¿Se guardó una **captura de pantalla** o un video del fallo en el disco? (`capturaOVideo`) | No | Ni Selenium ni nuestro kit guardan capturas automáticamente |
| ¿Se guardó una **traza o un informe** para revisar el fallo paso a paso sin volver a ejecutar las pruebas? (`trazaOInforme`) | No | Solo quedó el mensaje que apareció en la terminal |

**Tres cosas que nuestra medición NO demuestra:**

1. Solo hicimos 3 pruebas. Por eso, no sabemos cómo se comportaría Selenium con 300 pruebas.
2. Todas las mediciones se hicieron en un solo computador y con Chrome. Los tiempos pueden cambiar si usamos otra máquina o un navegador diferente.
3. El tiempo medido incluye abrir y cerrar Chrome, no solo ejecutar las pruebas. Además, contar líneas de código no indica qué tan difícil será mantenerlo con el tiempo.

## 4. Mirando el tablero (Parte 5)

Abran el tablero de la clase (el enlace lo da el docente) y respondan **con datos del tablero**, no con opiniones:

1. ¿Qué herramienta fue más rápida, medida en «veces el control»? ¿Y la más estable? ¿Hubo diferencias grandes **dentro** de una misma herramienta entre equipos? ¿A qué lo atribuyen?
2. ¿Qué herramienta dejó mejor diagnóstico y qué parte vino «de fábrica» o la tuvo que armar el equipo?
3. Un dato del tablero que les pareció raro. ¿Qué preguntarían a ese equipo antes de usarlo como evidencia?

> _Respuestas:_

## 5. Matriz y decisión (Partes 5 y 6)

☐ `MATRIZ.md` completa (pesos que suman 100, puntajes con evidencia, total y prueba de sensibilidad)  
☐ `ADR.md` completo (una página, con consecuencias negativas y qué nos haría cambiar de opinión)  
☐ `medidas.json`, `medidas-control.json` y `autoinforme.json` en el repositorio, con `git push`

**Nuestra recomendación en una frase:**

> _…_

## 6. Reflexión

1. Antes de medir, ¿qué herramienta habríamos recomendado? ¿Cambió algo después de ver los datos de **todas** las herramientas? Si la que recomendamos no es la que nos tocó, ¿por qué? Si lo es, ¿qué habría pasado si nos hubiera tocado otra?
2. ¿Qué evidencia nos hizo falta y no pudimos medir en esta actividad (por ejemplo: 300 pruebas en lugar de 3, otros navegadores, un mes de mantenimiento)?
3. En una automatización real, ¿qué parte del esfuerzo creen que es **escribir** las primeras pruebas y qué parte es **mantenerlas**? ¿Qué parte de esto no capta nuestra actividad?
4. Si el cliente fuera la empresa donde quieren trabajar, ¿qué pesos cambiarían en la matriz?
5. Si usaron un asistente de IA: ¿en qué momentos ayudó y en cuáles hubo que corregirlo? ¿Cómo cambia eso lo que significan los minutos de `autoinforme.json`?
