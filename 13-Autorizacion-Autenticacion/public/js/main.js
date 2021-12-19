const socket = io();

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();

  const producto = {
    nombre: document.getElementById("nombreProducto").value,
    precio: document.getElementById("precioProducto").value,
    foto: document.getElementById("fotoProducto").value,
  };

  socket.emit("insert", producto);

  formAgregarProducto.reset();
});

socket.on("productos", manejarEventoProductos);

async function manejarEventoProductos(productos) {
  const recursoRemoto = await fetch("plantillas/tabla-productos.hbs");

  const textoPlantilla = await recursoRemoto.text();

  const functionTemplate = Handlebars.compile(textoPlantilla);

  const html = functionTemplate({ productos });

  document.getElementById("productos").innerHTML = html;
}

const formAgregarMensaje = document.getElementById("formAgregarMensaje");
formAgregarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  const fecha = new Date();

  const mensaje = {
    author: {
      id: document.getElementById("id").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("text").value,
    timestamp: fecha.toLocaleString(),
  };

  socket.emit("newMessage", mensaje);

  formAgregarMensaje.reset();
});

socket.on("mensajes", manejarEventoMensajes);

async function manejarEventoMensajes(chats) {
  const authorSchema = new normalizr.schema.Entity(
    "author",
    {},
    { idAttribute: "id" }
  );
  const messageSchema = new normalizr.schema.Entity("mensajes", {
    author: authorSchema,
  });
  const chatSchema = new normalizr.schema.Entity("chat", {
    mensajes: [messageSchema],
  });
  let denormalizedMessage = normalizr.denormalize(
    chats.result,
    chatSchema,
    chats.entities
  );

  const { mensajes } = denormalizedMessage;

  const recursoRemoto = await fetch("plantillas/historial-chats.hbs");

  const textoPlantilla = await recursoRemoto.text();

  const functionTemplate = Handlebars.compile(textoPlantilla);

  const html = functionTemplate({ mensajes });

  document.getElementById("chats").innerHTML = html;

  const calculoCompresion =
    JSON.stringify(denormalizedMessage).length - JSON.stringify(chats).length;
  const porcentaje = parseInt(
    (calculoCompresion / JSON.stringify(denormalizedMessage).length) * 100
  );
  if (porcentaje < 0) {
    compresion.innerHTML = "No hay compresion al momento";
  } else {
    compresion.innerHTML = "Compresion: " + porcentaje + "%";
  }
}

socket.on("login", manejarEventoLogin);

async function manejarEventoLogin(usuario) {
  const recursoRemoto = await fetch("plantillas/datos-usuario.hbs");

  const textoPlantilla = await recursoRemoto.text();

  const functionTemplate = Handlebars.compile(textoPlantilla);

  const html = functionTemplate({ usuario });

  document.getElementById("usuario").innerHTML = html;
}
