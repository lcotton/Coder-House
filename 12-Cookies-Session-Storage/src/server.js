import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { productosDao } from "./daos/productos/index.js";
import { mensajesDao } from "./daos/mensajes/index.js";
import { productosMocks } from "./daos/productos/ProductosMocks.js";
import { normalize, schema } from "normalizr";
import session from "express-session";
import MongoStore from "connect-mongo";
import { create } from "express-handlebars";

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express();
const httpServer = new createServer(app);
const io = new Server(httpServer);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://coderhouse:coderhouse@coderhouse.naatu.mongodb.net/sesiones?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: "coderhouse",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

const hbs = create({});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set(
  "views",
  "/Users/pitun/Documents/GitHub/Coder-House/12-Cookies-Session-Storage/src/views"
);

let usuario;

app.get("/", (req, res) => {
  if (req.session.nombre) {
    usuario = req.session.nombre;
    res.sendFile(
      "/Users/pitun/Documents/GitHub/Coder-House/12-Cookies-Session-Storage/public/index.html"
    );
  } else {
    res.redirect("/login");
  }
});

const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
const messageSchema = new schema.Entity("mensajes", {
  author: authorSchema,
});
const chatSchema = new schema.Entity("chat", {
  mensajes: [messageSchema],
});

io.on("connection", async (socket) => {
  socket.emit("login", usuario);

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

app.get("/api/productos-test", async (req, res) => {
  const productos = await productosMocks.popular();
  res.json(productos);
});

app.get("/login", (req, res) => {
  if (req.session.nombre) {
    res.redirect("/");
  } else {
    res.sendFile(
      "/Users/pitun/Documents/GitHub/Coder-House/12-Cookies-Session-Storage/public/login.html"
    );
  }
});

app.post("/login", (req, res) => {
  const { nombre } = req.body;
  req.session.nombre = nombre;
  res.redirect("/");
});

app.get("/logout", async (req, res) => {
  const usuario = req.session.nombre;
  res.render("logout", { layout: "main", usuario });
  req.session.destroy();
});

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
