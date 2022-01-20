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
  res.status(404).render("routing-error", {});
}

export { getFaillogin, failRoute, getSignup, getFailsignup };
