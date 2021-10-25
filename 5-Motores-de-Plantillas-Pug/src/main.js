const express = require('express')

const productos = []

const app = express()

app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('formulario');
});

app.get('/productos', (req, res) => {
    res.render('historial', {productos});
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.render('historial', {productos});
});


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))