# Respuestas · Ejercicio 3

**1. Para el servidor, vuelve a lanzarlo y visita `/firmas`. ¿Qué ha pasado con las firmas y por qué?**

Han desaparecido: `/firmas` devuelve `[]`. Las firmas están guardadas en un array en memoria (RAM), y esa memoria pertenece al proceso de Node. Al pararlo se libera y al arrancar de nuevo el array se crea vacío. Para que se conserven habría que guardarlas en un fichero (con `fs`) o en una base de datos.

**2. ¿Por qué `let cuerpo = ''` tiene que declararse dentro de la función que atiende cada petición y no al principio del fichero?**

Porque si estuviera fuera, todas las peticiones compartirían la misma variable. Si dos personas envían el formulario casi a la vez, los trozos (`chunk`) de las dos peticiones se irían mezclando en el mismo string y los datos saldrían corruptos. Además, el contenido de una petición anterior se quedaría ahí y se sumaría al de la siguiente. Declarándola dentro, cada petición tiene su propio `cuerpo`, que empieza vacío.

**3. Si el formulario tuviera `required` en todos sus campos, ¿haría falta validar igualmente en el servidor? Razona la respuesta.**

Sí, hace falta. El `required` solo lo comprueba el navegador y es muy fácil saltárselo: se puede quitar desde F12, o enviar la petición con Postman, `curl` o un script sin pasar por el formulario. El servidor no puede fiarse de lo que le llega, así que tiene que validar siempre. La validación del cliente sirve para comodidad del usuario; la del servidor, para la seguridad y la integridad de los datos. Además, `required` no detecta un nombre formado solo por espacios ni limita los 200 caracteres.

**4. Firma con el nombre `<h1 style="color:red">Hola</h1>`. ¿Qué aparece en la página de agradecimiento? ¿Por qué es un problema de seguridad?**

Si el servidor mete el nombre tal cual en el HTML, el navegador no lo muestra como texto sino que lo interpreta: aparece "Gracias por firmar, " seguido de un "Hola" grande y en rojo, como si fuera un `<h1>` de verdad. Es un problema de seguridad porque el usuario puede inyectar el HTML que quiera, incluido `<script>`. Eso es un ataque **XSS** (Cross-Site Scripting): se podría ejecutar JavaScript en el navegador de otras personas (robar cookies, redirigirlas a otra web, cambiar el contenido de la página...). La solución es escapar el texto del usuario antes de ponerlo en el HTML.

**Ampliación:** he escrito `escaparHTML(texto)` en `servidor.js`, que cambia `&`, `<` y `>` por `&amp;`, `&lt;` y `&gt;`, y la uso en las respuestas HTML. Con eso el nombre del ejemplo se ve como texto literal. (El `&` se sustituye el primero para no escapar dos veces los `&` que genera el propio escapado.)
