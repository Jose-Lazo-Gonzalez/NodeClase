const http = require('http')

const HTML = { 'Content-Type': 'text/html; charset=utf-8' }

const pagina = (titulo, cuerpo) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${titulo}</title>
</head>
<body>
${cuerpo}
</body>
</html>`

const rutas = {
  '/': () => pagina('Inicio', `
  <h1>Inicio</h1>
  <ul>
    <li><a href="/sobre-mi">Sobre mí</a></li>
    <li><a href="/aficiones">Aficiones</a></li>
    <li><a href="/hora">Hora</a></li>
  </ul>`),

  '/sobre-mi': () => pagina('Sobre mí', `
  <h1>Pepe</h1>
  <p>Soy alumno de primero de DAM y estudio en La Algaba.
  Me gusta programar, hacer pequeños proyectos web y administrar servidores de juegos.</p>
  <p><a href="/">Volver al inicio</a></p>`),

  '/aficiones': () => pagina('Aficiones', `
  <h1>Mis aficiones</h1>
  <ul>
    <li>Videojuegos</li>
    <li>Programar</li>
    <li>Ir a la playa en verano</li>
  </ul>
  <p><a href="/">Volver al inicio</a></p>`),

  '/hora': () => pagina('Hora', `
  <h1>Hora</h1>
  <p>Son las ${new Date().toLocaleTimeString('es-ES')}</p>
  <p><a href="/">Volver al inicio</a></p>`)
}

const servidor = http.createServer((req, res) => {
  console.log(req.method, req.url)

  const generar = rutas[req.url]

  if (generar) {
    res.writeHead(200, HTML)
    res.end(generar())
  } else {
    res.writeHead(404, HTML)
    res.end(pagina('Error 404', `
  <h1>Error 404: la ruta no existe</h1>
  <p><a href="/">Volver al inicio</a></p>`))
  }
})

servidor.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})
