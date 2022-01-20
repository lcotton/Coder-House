import { Router } from "express";
import os from "os"

const routerInfo = new Router();

routerInfo.get("/", (req, res) => {
  res.json({
    Arg: process.argv.slice(2),
    SO: process.platform,
    Node: process.version,
    Memoria: process.memoryUsage().rss,
    execPath: process.execPath,
    PID: process.pid,
    ProjectFolder: process.cwd(),
    NroSrv: os.cpus().length
  });
});

export { routerInfo };
