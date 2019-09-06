# claudia-md-links

Recibe url de un directorio que contenga archivos markdown (.md) o url de un archivo markdown y muestra en consola todos los link que contenga ese directorio o archivo, con o sin análisis según lo indicado por el usuario. El análisis corresponde a validar la usabilidad de los links y mostrar su estado. En posibles mejoras se espera que se visualicen estadísticas que muestren si hay links repetidos, cuántos links son válidos y cuántos links son inválidos. 

## Instalación

```
npm install claudia-md-links
```

## API

### mdLinks (path, options)

##### Argumentos

- `path`: String que representa la ruta absoluta o relativa al archivo o directorio.
- `options`: String que representa si el usuario desea validar los links, visualizar estadísticas o ambos. Se espera que en futuras iteraciones reciba un objeto con un booleano que representa si el usuario desea validar o no los links encontrados.

##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelve un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

En futuras iteraciones se espera que tenga este funcionamiento:

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable funciona de la siguiente manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

**Comportamiento por defecto:** Identifica el archivo markdown (a partir de la ruta que recibe como argumento), lo analiza e imprimime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate` o `--val`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como válido.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `OK` o `FAIL` después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.

##### `--stats`

Si pasamos la opción `--stats` o `--st` el output (salida) será un texto con estadísticas básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` o `--st` y `--val` o `--validate` y `--stats` o `--val` y `--st` para obtener estadísticas que necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

Se encuentran implementadas las opciones combinadas, sin embargo tienen un comportamiento no tan conforme. Se espera mejorar en futuras iteraciones.


## Testing

```
npm test
```

Se implementa test para dos funciones dentro del documento `md-links.js`. En el futuro, se espera testear promesas.


## Implementación Actual

### Diagrama de Flujo y Comentarios acerca de la Implementación

Como punto de partida se estableció el siguiente diagrama desde el punto de vista del usuario:

```
Ingresa Petición
$md-links <path> [option]
|
|__Si option es vacío
|        - Busca archivo.md
|        - Entra a .md
|        - Si encuentra link:
|              - Imprime link
|              - imprime ruta
|              - Encuentra texto con la ruta:
|                    - Si el texto de la ruta es igual o menor a 50 caracteres:
|                        Imprime texto
|                    - Si no
|                        Imprime texto truncado a 50 caracteres.
|
|__Si option es true
         - Si option es --validate:
               - Hace petición HTTP:
                     - Si link funciona
                         Output OK
                     - Si no
                         Output FAIL
         - Si option es --stats:
               - Imprime cantidad de links.
               - Imprime cantidad de links únicos.
         - Si option es --validate --stats:
               - Imprime cantidad de links.
               - Imprime cantidad de links únicos.
               - Imprime cantidad de links rotos.
```

Este diagrama de flujo presenta el problema que no muestra los pasos previos cuando option es true. Por el tiempo limitado, se resolvió este problema duplicando el documento de funcionamiento por defecto y adaptándolo para cada caso cuando option es true. Se repite código pero no se pierde tiempo buscando la manera de optimizar. Como futura mejora, hay que optimizar integrando los documentos de forma que no se repita código.

En cada documento `md-links... .js` se convoca todo el código a partir de una promesa. Una de las funciones hace exactamente lo mismo que la promesa, pero sin ser implementado como promesa. Pese a ser código muerto, se mantiene en su lugar con fines pedagógicos (o la palabra que corresponde para el aprendizaje de adultos).
