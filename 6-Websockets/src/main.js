const express = require('express')
const fs = require('fs');


const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productos = []
let chats = []

const ruta = '/chats.txt'

getAllChats = async() => {
    try {
        const rawChat = await fs.promises.readFile(__dirname+ruta,'utf-8')
        if( rawChat === ""){
            return chats
        }
        else {
            chats = JSON.parse(rawChat)
            return chats
        }
    }
    catch(err) {
        console.log('Error al intentar leer el archivo',err)

    }
}

getAllChats()

io.on('connection', async socket => {

    socket.emit('productos', productos);

    socket.emit('mensajes', chats);

    socket.on('update', producto => {
        productos.push(producto)
        io.sockets.emit('productos', productos);
    })

    socket.on('newMessage', async mensaje => {
        chats.push(mensaje)
        let content = JSON.stringify(chats)
        content = await fs.promises.writeFile(__dirname+ruta,content)
        io.sockets.emit('mensajes', chats)
    })
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))