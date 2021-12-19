import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { productosDao } from "./daos/productos/index.js";
import { mensajesDao } from "./daos/mensajes/index.js";
import { productosMocks } from "./daos/productos/ProductosMocks.js";
import { normalize, schema } from "normalizr";
import session from "express-session";
import { create } from "express-handlebars";
import bCrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./model.js";
import { conectarDB } from "./controllerdb.js";
import { getFaillogin, getSignup, getFailsignup, failRoute } from "./routes.js";

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log("User Registration succesful");
          console.log(userWithId)
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
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
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
  "/Users/lcotton/Documents/Git-Hub/Coder-House/13-Autorizacion-Autenticacion/src/views"
);

app.use(
  session({
    secret: "coderhouse",
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

app.get("/api/productos-test", async (req, res) => {
  const productos = await productosMocks.popular();
  res.json(productos);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("*", failRoute);

conectarDB(
  "mongodb+srv://coderhouse:coderhouse@coderhouse.naatu.mongodb.net/blog?retryWrites=true&w=majority",
  (err) => {
    if (err) return console.log("error en conexión de base de datos", err);
    console.log("BASE DE DATOS CONECTADA");
  }
);

const PORT = 8080;
const connectedServer = httpServer.listen(8080, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
