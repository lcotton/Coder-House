import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ProductosRepo from "./persistencia/repos/ProductosRepo.js";
import MensajesRepo from "./persistencia/repos/MensajesRepo.js";
import session from "express-session";
import { create } from "express-handlebars";
import passport from "./controlador/auth.js";
import { failRoute } from "./controlador/login.js";
import { normalizarMensajes } from "./controlador/normalizr.js";
import parseArgs from "minimist";
import { routerInfo } from "./api/info.js";
import { routerProductosRandom } from "./api/faker.js";
import { routerRaiz, cargarDatosUsuario } from "./api/raiz.js";
import { credenciales } from "./config/credenciales.js";
import logger from "./logger.js";

const app = express();
const httpServer = new createServer(app);
const io = new Server(httpServer);

const hbs = create({});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./public/views");

app.use(
  session({
    secret: credenciales.SESSION_SECRET_KEY,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/info", routerInfo);
app.use("/api/productos-test", routerProductosRandom);
app.use("/", routerRaiz);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/failsignup",
    successRedirect: "/login",
  })
);

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
    successRedirect: "/",
  })
);

const productoRepo = new ProductosRepo();
const mensajeRepo = new MensajesRepo()


io.on("connection", async (socket) => {

  socket.emit("login", await cargarDatosUsuario());

  let productos = await productoRepo.listar();
  socket.emit("productos", productos);

  let chats = await mensajeRepo.listarMensajes();
  chats = await normalizarMensajes(chats);
  socket.emit("mensajes", chats);

  socket.on("insert", async (producto) => {
    await productoRepo.insertar(producto);
    let productos = await productoRepo.listar();
    io.sockets.emit("productos", productos);
  });

  socket.on("newMessage", async (mensaje) => {
    await mensajeRepo.insertarMensaje(mensaje);
    let chats = await mensajeRepo.listarMensajes();
    chats = await normalizarMensajes(chats);
    io.sockets.emit("mensajes", chats);
  });
});

app.get("*", failRoute);


const options = {
  alias: {
    p: "puerto",
    m: "modo",
  },
  default: {
    puerto: 8080,
    modo: "FORK",
  },
};

const commandLineArgs = process.argv.slice(2);

const { puerto, modo } = parseArgs(commandLineArgs, options);

const PORT = process.env.PORT || puerto;

const connectedServer = httpServer.listen(PORT, () => {
  logger.info(
    `Servidor HTTP escuchando en el puerto ${
      connectedServer.address().port
    } - PID WORKER ${process.pid}`
  );
});
connectedServer.on("error", (error) =>
  logger.info(`Error en servidor ${error}`)
);
