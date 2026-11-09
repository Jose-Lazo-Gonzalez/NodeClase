# Respuestas · Ejercicio 1

**1. Al recargar, en la terminal aparece a veces `GET /favicon.ico`. ¿Quién hace esa petición y qué le responde tu servidor?**

La hace el propio navegador, sin que nadie se lo pida: cada vez que carga una web intenta descargar el icono de la pestaña (`/favicon.ico`). Mi servidor no tiene esa ruta en el diccionario, así que le responde con la página de error 404 (código 404, HTML). No pasa nada grave, el navegador simplemente se queda sin icono.

**2. Si escribes la hora directamente como valor dentro del objeto de rutas, siempre sale la misma. ¿Por qué ocurre?**

Porque el objeto `rutas` se crea una sola vez, cuando arranca el servidor, y `new Date().toLocaleTimeString(...)` se ejecuta en ese momento. El texto con la hora se guarda como valor fijo y en cada petición se devuelve ese mismo texto. Para que cambie hay que guardar una función en el objeto y llamarla dentro de `createServer`, que es lo que se ejecuta en cada petición. Así la hora se calcula cada vez.
