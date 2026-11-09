const http = require('http')
const fs = require('fs')
const path = require('path')

const HTML = { 'Content-Type': 'text/html; charset=utf-8' }
const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' }

const firmas = []

function escaparHTML (texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

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

const servidor = http.createServer((req, res) => {
  console.log(req.method, req.url)

  const url = new URL(req.url, 'http://localhost')

  if (req.method === 'GET' && url.pathname === '/') {
    const ruta = path.join(__dirname, 'recursos', 'formulario.html')
    return fs.readFile(ruta, (err, datos) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
        return res.end('Error 500: no se pudo leer el formulario')
      }
      res.writeHead(200, HTML)
      res.end(datos)
    })
  }

  if (req.method === 'GET' && url.pathname === '/firmas') {
    const nombre = url.searchParams.get('nombre')
    const resultado = nombre === null
      ? firmas
      : firmas.filter((f) => f.nombre === nombre)
    res.writeHead(200, JSON_HEADERS)
    return res.end(JSON.stringify(resultado, null, 2))
  }

  if (req.method === 'POST' && url.pathname === '/firmar') {
    let cuerpo = ''
    req.on('data', (chunk) => { cuerpo += chunk })

    req.on('end', () => {
      const datos = Object.fromEntries(new URLSearchParams(cuerpo))
      const nombre = (datos.nombre || '').trim()
      const mensaje = (datos.mensaje || '').trim()

      let error = null
      if (!nombre) error = 'El nombre es obligatorio.'
      else if (!mensaje) error = 'El mensaje es obligatorio.'
      else if (mensaje.length > 200) error = 'El mensaje no puede pasar de 200 caracteres.'

      if (error) {
        res.writeHead(400, HTML)
        return res.end(pagina('Error', `
  <h1>Error 400</h1>
  <p>${escaparHTML(error)}</p>
  <p><a href="/">Volver al formulario</a></p>`))
      }

      firmas.push({ nombre, mensaje, fecha: new Date().toISOString() })

      res.writeHead(201, HTML)
      res.end(pagina('Gracias', `
  <h1>Gracias por firmar, ${escaparHTML(nombre)}</h1>
  <p><a href="/">Volver al inicio</a></p>`))
    })
    return
  }

  res.writeHead(404, HTML)
  res.end(pagina('Error 404', `
  <h1>Error 404</h1>
  <p>La ruta no existe.</p>
  <p><a href="/">Volver al inicio</a></p>`))
})

servidor.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})
