import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { productosDao } from "./persistencia/daos/productos/index.js";
import { mensajesDao } from "./persistencia/daos/mensajes/index.js";
import session from "express-session";
import { create } from "express-handlebars";
import passport from "./controlador/auth.js";
import { failRoute } from "./controlador/login.js";
import { normalizarMensajes } from "./controlador/mensajes.js";
import parseArgs from "minimist";
import { routerInfo } from "./rutas/info.js";
import { routerProductosRandom } from "./rutas/faker.js";
import { routerRaiz, cargarDatosUsuario } from "./rutas/raiz.js";
import { credenciales } from "./credenciales.js";
import { conectarDB } from "./options/controllerdb.js";
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


io.on("connection", async (socket) => {
  socket.emit("login", await cargarDatosUsuario());

  let productos = await productosDao.listar();
  socket.emit("productos", productos);

  let chats = await mensajesDao.listarMensajes();
  chats = await normalizarMensajes(chats)
  socket.emit("mensajes", chats);

  socket.on("insert", async (producto) => {
    await productosDao.insertar(producto);
    let productos = await productosDao.listar();
    io.sockets.emit("productos", productos);
  });

  socket.on("newMessage", async (mensaje) => {
    await mensajesDao.insertarMensaje(mensaje);
    let chats = await mensajesDao.listarMensajes();
    chats = await normalizarMensajes(chats)
    io.sockets.emit("mensajes", chats);
  });
});

app.get("*", failRoute);

conectarDB(
  `mongodb+srv://${credenciales.MONGO_ATLAS_USER}:${credenciales.MONGO_ATLAS_PASSWORD}@${credenciales.MONGO_ATLAS_CLUSTER}/${credenciales.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`,
  (err) => {
    if (err) return logger.info("error en conexión de base de datos", err);
  }
);

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
