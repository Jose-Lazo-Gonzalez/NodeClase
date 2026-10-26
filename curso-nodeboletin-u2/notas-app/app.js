const { notaMedia, aprobados, mejorAlumno } = require('./notas')
const fs = require('fs/promises')
const pc = require('picocolors')

function mostrarAlumnos(alumnos) {
  for (const alumno of alumnos) {
    if (alumno.nota >= 5) {
      console.log(pc.green(alumno.nombre))
    } else {
      console.log(pc.red(alumno.nombre))
    }
  }
}

async function main() {
  try {
    const datos = await fs.readFile('notas.json', 'utf8')
    const alumnos = JSON.parse(datos)

    console.log('Nota media:', notaMedia(alumnos))
    console.log('Número de aprobados:', aprobados(alumnos).length)
    console.log('Mejor alumno:', mejorAlumno(alumnos))

    mostrarAlumnos(alumnos)
  } catch (err) {
    console.error(pc.red('Error: ' + err.message))
  }
}

main()