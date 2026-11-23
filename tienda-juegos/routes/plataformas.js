const express = require('express')
const router = express.Router()

const arrayPlataformas = [
  { id: 'p01', nombre: 'Switch', fabricante: 'Nintendo', año: 2017 },
  { id: 'p02', nombre: 'PS5', fabricante: 'Sony', año: 2020 },
  { id: 'p03', nombre: 'Xbox Series X', fabricante: 'Microsoft', año: 2020 },
  { id: 'p04', nombre: 'Steam Deck', fabricante: 'Valve', año: 2022 }
]
router.get('/', (req, res) => {
  res.render('plataformas', { titulo: 'Plataformas', arrayPlataformas })
})

module.exports = router