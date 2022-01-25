import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { productosDao } from "./daos/productos/index.js";
import { mensajesDao } from "./daos/mensajes/index.js";
import { normalize, schema } from "normalizr";
import session from "express-session";
import { create } from "express-handlebars";
import bCrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./model.js";
import { getFaillogin, getSignup, getFailsignup, failRoute } from "./routes.js";
import parseArgs from "minimist";
//import { routerRandom } from "./router/random.js";
import { routerInfo } from "./router/info.js";
import { routerProductosRandom } from "./router/faker.js";
import { credenciales } from "./credenciales.js";
import { conectarDB } from "./controllerdb.js";
import cluster from "cluster";
import os from "os";
import logger from "./logger.js";

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          logger.info("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          logger.info("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            logger.info("Error in Saving user: " + err);
            return done(err);
          }
          logger.info("User Registration succesful");
          logger.info(userWithId);
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        logger.info("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        logger.info("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const app = express();
const httpServer = new createServer(app);
const io = new Server(httpServer);

const hbs = create({});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set(
  "views",
  "/Users/lcotton/Documents/Git-Hub/Coder-House/16-Logs-Profiling-Debug/src/views"
);

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
//app.use("/api/randoms", routerRandom);
app.use("/info", routerInfo);
app.use("/api/productos-test", routerProductosRandom);

let usuario;

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/", checkAuthentication, (req, res) => {
  usuario = req.user.username;
  logger.info(`${usuario} ha sido autenticado`);
  res.sendFile("index.html", { root: "./public" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/signup", getSignup);

app.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/failsignup",
    successRedirect: "/login",
  })
);

app.get("/failsignup", getFailsignup);

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.sendFile("login.html", { root: "./public" });
  }
});

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
    successRedirect: "/",
  })
);
app.get("/faillogin", getFaillogin);

const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
const messageSchema = new schema.Entity("mensajes", {
  author: authorSchema,
});
const chatSchema = new schema.Entity("chat", {
  mensajes: [messageSchema],
});

io.on("connection", async (socket) => {
  socket.emit("login", await cargarDatosUsuario());

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

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
  logger.info(`${usuario} ha terminando la sesion`);
});

app.get("*", failRoute);

conectarDB(
  `mongodb+srv://${credenciales.MONGO_ATLAS_USER}:${credenciales.MONGO_ATLAS_PASSWORD}@${credenciales.MONGO_ATLAS_CLUSTER}/${credenciales.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`,
  (err) => {
    if (err) return logger.info("error en conexión de base de datos", err);
  }
);

const cargarDatosUsuario = async () => {
  return usuario;
};

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

if (modo == "CLUSTER" && cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  logger.info(`Número de procesadores: ${numCPUs}`);
  logger.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    logger.info(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  const connectedServer = httpServer.listen(puerto, () => {
    logger.info(
      `Servidor HTTP escuchando en el puerto ${
        connectedServer.address().port
      } - PID WORKER ${process.pid}`
    );
  });
  connectedServer.on("error", (error) =>
    logger.info(`Error en servidor ${error}`)
  );
}
