import { Router } from "express";
import { fork } from "child_process";

const routerRandom = new Router();

routerRandom.get("/", (req, res) => {
  const forked = fork(
    "/Users/lcotton/Documents/Git-Hub/Coder-House/15-Cluster-Escalabilidad/src/utils/random-child.js"
  );

  const iteraciones = req.query.cant;

  forked.on("message", (msg) => {
    if (msg.isReady) {
      if (typeof iteraciones != "undefined") {
        forked.send(iteraciones);
      } else {
        forked.send(100000000);
      }
    } else {
      res.json({ distribucion: msg });
    }
  });
});

export { routerRandom };
