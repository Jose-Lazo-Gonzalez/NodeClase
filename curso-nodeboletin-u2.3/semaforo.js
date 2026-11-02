// Un semáforo que hereda de EventEmitter
const EventEmitter = require('events')

class Semaforo extends EventEmitter {
  constructor(ms) {
    super()
    this.color = 'verde' 

    this.intervalo = setInterval(() => {
      if (this.color === 'verde') {
        this.color = 'ámbar'
      } else if (this.color === 'ámbar') {
        this.color = 'rojo'
      } else {
        this.color = 'verde'
      }

      this.emit('cambio', this.color)

      if (this.color === 'rojo') {
        this.emit('rojo')
      }
    }, ms)
  }

  parar() {
    clearInterval(this.intervalo)
    this.emit('parado')
  }

}

module.exports = Semaforo