const express = require('express')
const router = express.Router()
const arrayJuegos = [
{ id: 'j01', titulo: 'Mario Kart 8 Deluxe', plataforma: 'Switch', precio: 49.99 },
{ id: 'j02', titulo: 'Minecraft', plataforma: 'PC', precio: 26.95 },
{ id: 'j03', titulo: 'EA Sports FC 26', plataforma: 'PS5', precio: 69.99 },
{ id: 'j04', titulo: 'Stardew Valley', plataforma: 'PC', precio: 13.99 },
{ id: 'j05', titulo: 'Zelda: Tears of the Kingdom', plataforma: 'Switch', precio: 59.99 }
]

router.get('/', (req, res) => {
  res.render('juegos', { titulo: 'Juegos', arrayJuegos })
})

router.get('/baratos', (req, res) => {
  const baratos = arrayJuegos.filter(juego => juego.precio < 30)
  res.render('juegos', { titulo: 'Juegos de menos de 30 €', arrayJuegos: baratos })
})

module.exports = router
