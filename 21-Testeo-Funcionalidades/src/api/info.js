import { Router } from "express";
import os from "os";
import compression from "compression";
import logger from "../logger.js";

const routerInfo = new Router();

const infoObject = {
  Arg: process.argv.slice(2),
  SO: process.platform,
  Node: process.version,
  Memoria: process.memoryUsage().rss,
  execPath: process.execPath,
  PID: process.pid,
  ProjectFolder: process.cwd(),
  NroSrv: os.cpus().length,
};

routerInfo.get("/", (req, res) => {
  res.json(infoObject);
  logger.info(`Informacion mostrada con exito`);
});

routerInfo.get("/console-log", (req, res) => {
  console.log(infoObject)
  res.json(infoObject);
  logger.info(`Informacion mostrada con exito y tambien en el Console Log`);
});

routerInfo.get("/zip", compression(), (req, res) => {
  res.json(infoObject);
  logger.info(`Informacion comprimida mostrada con exito`);
});

export { routerInfo };
