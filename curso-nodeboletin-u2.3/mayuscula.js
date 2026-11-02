
const fs = require('fs')


process.stdout.write('Qué fichero quieres copiar?')

process.stdin.once('data', (resp) => {
  const origen = resp.toString().trim()
  const destino = 'MAYUS-' + origen
  const lectura = fs.createReadStream(origen, 'utf8')
  let escritura
  let bytes = 0

  // Creamos la copia solo cuando el fichero se ha abierto bien
  lectura.on('open', () => {
    escritura = fs.createWriteStream(destino)
    escritura.on('finish', () => {
      console.log('Creado ' + destino + ' (' + bytes + ' bytes)')
      process.exit()
    })
  })

  lectura.on('data', (texto) => {
    bytes += Buffer.byteLength(texto)
    escritura.write(texto.toUpperCase())
  })

  lectura.on('end', () => {
    escritura.end()
  })

  lectura.on('error', (err) => {
    console.error('Error:', err.message)
    process.exit(1)
  })
})