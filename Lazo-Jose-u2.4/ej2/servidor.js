const http = require('http')
const fs = require('fs')
const path = require('path')

const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8'
}

const ficheros = {
  '/': 'index.html',
  '/contacto': 'contacto.html',
  '/estilos.css': 'estilos.css'
}

const servidor = http.createServer((req, res) => {
  console.log(req.method, req.url)

  const ruta = req.url.split('?')[0]

  let fichero = ficheros[ruta]
  let codigo = 200
  if (!fichero) {
    fichero = '404.html'
    codigo = 404
  }

  const rutaFichero = path.join(__dirname, 'paginas', fichero)
  const tipo = tipos[path.extname(fichero)]

  fs.readFile(rutaFichero, (err, datos) => {
    if (err) {
      console.error('Error al leer', fichero, '->', err.code)
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      return res.end('Error 500: no se pudo leer el fichero')
    }
    res.writeHead(codigo, { 'Content-Type': tipo })
    res.end(datos)
  })
})

servidor.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})
