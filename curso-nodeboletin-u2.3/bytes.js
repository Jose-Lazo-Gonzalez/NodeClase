// Uso: node bytes.js "5 €"
const texto = process.argv[2]
 
console.log('Caracteres:', texto.length)
console.log('Bytes:', Buffer.byteLength(texto))
console.log('Buffer:', Buffer.from(texto))
 
const buf = Buffer.alloc(26)
for (let i = 0; i < buf.length; i++) {
  buf[i] = 65 + i
}
console.log(buf.toString('ascii'))