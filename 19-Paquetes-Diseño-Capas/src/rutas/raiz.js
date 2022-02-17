import { Router } from "express";
import logger from "../logger.js";
import {
  getFaillogin,
  getSignup,
  getFailsignup,
} from "../controlador/login.js";

const routerRaiz = new Router();

let usuario;

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

const cargarDatosUsuario = async () => {
  return usuario;
};

routerRaiz.get("/", checkAuthentication, (req, res) => {
  usuario = req.user.username;
  logger.info(`${usuario} ha sido autenticado`);
  res.sendFile("index.html", { root: "./public" });
});

routerRaiz.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.sendFile("login.html", { root: "./public" });
  }
});

routerRaiz.get("/faillogin", getFaillogin);


routerRaiz.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
  logger.info(`${usuario} ha terminando la sesion`);
});

routerRaiz.get("/signup", getSignup);

routerRaiz.get("/failsignup", getFailsignup);


export { routerRaiz, cargarDatosUsuario };
