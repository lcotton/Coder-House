const express = require('express')
const app = express()
const fs = require('fs');

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    getAll = async () => {
        try {
            const content = await fs.promises.readFile(this.archivo,'utf-8')
            return JSON.parse(content)
        }

        catch(err) {
            console.log('Error al leer el contenido',err)
        }
    }

    getRandom = async () => {
        try {
            const content = await fs.promises.readFile(this.archivo,'utf-8')
            const products = JSON.parse(content)
            const random = parseInt(Math.random() * products.length)
            return products[random]
        }

        catch(err) {
            console.log('Error al leer el contenido',err)
        }
    }

}


app.get('/', (req,res) => {
    res.send('<h1 style="color:blue;text-align:center;">Bienvenidos a la entrega Nº3 - Lucas Cotton</h1>')
})

app.get('/productos', (req, res) => {
    const c = new Contenedor('/Users/pitun/Documents/GitHub/Coder-House/3-Nuestro-Primer-Servidor-Web/productos.txt')
    c.getAll().then((data,err)=>{
        res.send(data)
    })
})

app.get('/productoRandom', (req, res) => {
    const c = new Contenedor('/Users/pitun/Documents/GitHub/Coder-House/3-Nuestro-Primer-Servidor-Web/productos.txt')
    c.getRandom().then((data,err)=>{
        res.send(data)
    })
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))








