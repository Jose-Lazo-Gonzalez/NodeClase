# Respuestas · Ejercicio 2

**1. Al cargar `/` aparecen dos peticiones en la terminal. ¿Cuáles son y por qué?**

Son `GET /` y `GET /estilos.css`. Primero el navegador pide la página HTML, y cuando la lee encuentra el `<link rel="stylesheet" href="/estilos.css">`, así que hace una segunda petición para descargar la hoja de estilos. Cada recurso (HTML, CSS, imágenes...) es una petición distinta. Además, a veces aparece una tercera, `GET /favicon.ico`, que el navegador pide por su cuenta.

**2. Imagina que tienes que servir un vídeo de 500 MB. ¿Qué problema tendría `fs.readFile` y qué alternativa de las vistas en clase usarías?**

`fs.readFile` carga el fichero entero en memoria antes de poder enviarlo, así que cada petición ocuparía 500 MB de RAM y el navegador no recibiría nada hasta que terminara de leerse. Con varias visitas a la vez el servidor se podría quedar sin memoria. La alternativa es usar streams: `fs.createReadStream(ruta).pipe(res)`, que envía el fichero a trozos según se va leyendo, sin tenerlo completo en memoria (y el stream se crea dentro de la función, uno nuevo por petición).
