
const fs = require('fs')
const path = require('path')


const carpeta = process.argv[2] || __dirname
const ficheros = fs.readdirSync(carpeta)

const cuenta = {}

for (const fichero of ficheros) {
  let ext = path.extname(fichero)
  if (ext === '') {
    ext = '(sin extensión)'
  }

  if (cuenta[ext]) {
    cuenta[ext]++
  } else {
    cuenta[ext] = 1
  }
}

console.table(cuenta)