
const { Router } = require('express');
const routerProductos = Router();

const productos = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
      },
      {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
      },
      {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
      }
]


routerProductos.get('/', (req, res) => {
    res.json(productos);
});

routerProductos.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto_buscado = productos.filter( p => p.id === id)

    if( producto_buscado.length === 0) {
        return res.json({ error : 'producto no encontrado' })
    }
    else {
        return res.json(producto_buscado)
    }
});

routerProductos.put('/:id', (req, res) => {
    const { title } = req.body
    const { price } = req.body
    const { thumbnail } = req.body
    const id = parseInt(req.params.id)
    const producto_buscado = productos.filter( p => p.id === id)

    if( producto_buscado.length === 0) {
        return res.json({ error : 'producto no encontrado' })
    }
    else {
        const index = productos.findIndex( p => p.id === id)
        productos[index].title = title
        productos[index].price = price
        productos[index].thumbnail = thumbnail
        return res.json({ title_actualizado: title, price_actualizado: price , thumbnail_actualizado: thumbnail})
    }
});

routerProductos.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto_buscado = productos.filter( p => p.id === id)
    
    if( producto_buscado.length === 0) {
        return res.json({ error : 'producto no encontrado' })
    }
    else {
        const index = productos.findIndex( p => p.id === id)
        const producto_borrado = productos.splice(index,1)
        return res.send('Producto borrado exitosamente')
    }
});


routerProductos.post('/', (req, res) => {

    if( productos.length === 0) {
        productos.push(req.body)
        productos[0].id = 1
        return res.json({id_asignado: 1})
    }
    else {
        const id_max = productos.reduce((max,p) => p.id > max ? p.id : max ,productos[0].id)
        const index = productos.length
        productos.push(req.body)
        const new_id = id_max + 1
        productos[index].id = new_id
        return res.json({id_asignado: new_id})
    }
});



exports.routerProductos = routerProductos;