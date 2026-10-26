

function notaMedia(alumnos) {
  if (alumnos.length === 0) return 0
  let suma = 0
  for (let i = 0; i < alumnos.length; i++) {
    suma = suma + alumnos[i].nota
  }
  return suma / alumnos.length
}


function aprobados(alumnos) {
  return alumnos.filter(function (alumno) {
    return alumno.nota >= 5
  })
}

// Aqui he tenido que usar la IA para entender el funcionamiento del reduce.
function mejorAlumno(alumnos) {
  if (alumnos.length === 0) return null
  return alumnos.reduce(function (mejor, alumno) {
    return alumno.nota > mejor.nota ? alumno : mejor
  })
}

module.exports ={notaMedia,aprobados,mejorAlumno};

