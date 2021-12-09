import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { productosDao } from "./daos/productos/index.js";
import { mensajesDao } from "./daos/mensajes/index.js";
import { productosMocks } from "./daos/productos/ProductosMocks.js";
import { normalize, schema } from "normalizr";

const app = express();
const httpServer = new createServer(app);
const io = new Server(httpServer);

const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
const messageSchema = new schema.Entity("mensajes", {
  author: authorSchema,
});
const chatSchema = new schema.Entity("chat", {
  mensajes: [messageSchema],
});

app.get("/api/productos-test", async (req, res) => {
  const productos = await productosMocks.popular();
  res.json(productos);
});

io.on("connection", async (socket) => {
  let productos = await productosDao.listar();
  socket.emit("productos", productos);

  let chats = await mensajesDao.listarMensajes();
  chats = normalize(chats, chatSchema);
  socket.emit("mensajes", chats);

  socket.on("insert", async (producto) => {
    await productosDao.insertar(producto);
    let productos = await productosDao.listar();
    io.sockets.emit("productos", productos);
  });

  socket.on("newMessage", async (mensaje) => {
    await mensajesDao.insertarMensaje(mensaje);
    let chats = await mensajesDao.listarMensajes();
    chats = normalize(chats, chatSchema);
    io.sockets.emit("mensajes", chats);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
