const segundos = Number(process.argv[2])
let mensaje = process.argv.slice(3).join(' ')

if (mensaje === '') {
  mensaje = '¡Tiempo!'
}
if (!Number.isInteger(segundos) || segundos <= 0) {
  console.error('node temporizador.js <segundos> [mensaje]')
  process.exit(1)
}

let quedan = segundos
console.time('Duración total')
const intervalo = setInterval(() => {
  quedan--
  console.log('Quedan ' + quedan + ' s')

  if (quedan === 0) {
    clearInterval(intervalo)
    console.log(mensaje)
    console.timeEnd('Duración total')
  }
}, 1000)


setTimeout(() => {
  console.log('¡Ya vas por la mitad!')
}, (segundos * 1000) / 2)