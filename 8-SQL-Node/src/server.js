import express from "express";
import { createServer } from "http";
import { Server} from "socket.io";
import ProductoSql from "./sqlMaria.js";
import ChatSql from "./sqlite3.js";
import { optionsmariaDB } from "./options/mariaDB.js";
import { optionsSQLite3 } from "./options/SQLite3.js";

const app = express();
const httpServer = new createServer(app);
const io = new Server(httpServer);
const sqlProductos = new ProductoSql(optionsmariaDB);
const sqlChats = new ChatSql(optionsSQLite3);

await sqlProductos.crearTabla();
await sqlChats.crearTabla();

io.on("connection", async (socket) => {
  let productos = await sqlProductos.listarProductos();
  socket.emit("productos", productos);

  let chats = await sqlChats.listarChats();
  socket.emit("mensajes", chats);

  socket.on("insert", async (producto) => {
    await sqlProductos.insertarProductos(producto);
    let productos = await sqlProductos.listarProductos();
    io.sockets.emit("productos", productos);
  });

  socket.on("newMessage", async (mensaje) => {
    await sqlChats.insertarChats(mensaje);
    let chats = await sqlChats.listarChats();
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
