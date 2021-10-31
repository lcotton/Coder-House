const socket = io();

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {

    e.preventDefault()


    const producto = {
        nombre: document.getElementById('nombreProducto').value,
        precio: document.getElementById('precioProducto').value,
        fotoUrl: document.getElementById('fotoProducto').value
    }

    socket.emit('update', producto);

    formAgregarProducto.reset()
})

socket.on('productos', manejarEventoProductos);

async function manejarEventoProductos(productos) {

    const recursoRemoto = await fetch('plantillas/tabla-productos.hbs')

    const textoPlantilla = await recursoRemoto.text()

    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ productos })

    document.getElementById('productos').innerHTML = html
}


const formAgregarMensaje = document.getElementById('formAgregarMensaje')
formAgregarMensaje.addEventListener('submit', e => {

    e.preventDefault()

    const fecha = new Date()
   
    const mensaje = {
        mail: document.getElementById('email').value,
        mensaje: document.getElementById('mensaje').value,
        timestamp: fecha.toLocaleString()
    }

    socket.emit('newMessage', mensaje);

    formAgregarMensaje.reset()
})

socket.on('mensajes', manejarEventoMensajes);

async function manejarEventoMensajes(chats) {

    const recursoRemoto = await fetch('plantillas/historial-chats.hbs')

    const textoPlantilla = await recursoRemoto.text()

    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ chats })

    document.getElementById('chats').innerHTML = html
}



