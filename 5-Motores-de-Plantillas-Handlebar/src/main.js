const express = require('express')
const exphbs = require('express-handlebars')


const productos = []

const app = express()

app.use(express.urlencoded({ extended: true }))

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'inicio.hbs'
  }))

app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', (req,res) => {
  res.render('formulario',{layout: 'inicio'})
})

app.get('/productos', (req,res) => {
  res.render('historial', {productos,hayProductos:productos.length>0});
})

app.post('/productos', (req, res) => {
  productos.push(req.body)
  res.render('historial', {productos,hayProductos:productos.length>0});
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))