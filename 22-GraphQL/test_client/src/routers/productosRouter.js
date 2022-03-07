import { Router } from "express";

function crearRouter(cosasDao) {
  const router = Router();

  router.get("/", async (req, res) => {
    res.send(await cosasDao.listar());
  });

  router.post("/", async (req, res) => {
    await cosasDao.insertar(req.body);
    res.send(await cosasDao.listar());
  });

  router.delete("/", async (req, res) => {
    await cosasDao.borrar(req.body.producto);
    res.send(await cosasDao.listar());
  });

  router.put("/", async (req, res) => {
    await cosasDao.actualizar(req.body,req.body.nombre);
    res.send(await cosasDao.listar());
  });


  return router;
}

export { crearRouter };
