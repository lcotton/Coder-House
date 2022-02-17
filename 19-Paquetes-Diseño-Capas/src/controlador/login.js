import logger from "../logger.js";

function getSignup(req, res) {
  res.sendFile("signup.html", { root: "./public" });
}

function getFaillogin(req, res) {
  res.render("login-error", {});
}

function getFailsignup(req, res) {
  res.render("signup-error", {});
}

function failRoute(req, res) {
  const { url, method } = req;
  res.status(404).render("routing-error", {});
  logger.warn(`Ruta ${method} ${url} no implementada`);
}

export { getFaillogin, failRoute, getSignup, getFailsignup };
