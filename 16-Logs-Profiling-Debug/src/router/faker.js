import { Router } from "express";
import { productosMocks } from "../daos/productos/ProductosMocks.js";
import logger from "../logger.js";


const routerProductosRandom = new Router();

routerProductosRandom.get("/", async (req, res) => {
  const productos = await productosMocks.popular();
  res.json(productos);
  logger.info(`Productos Faker generados con exito`)
});

export { routerProductosRandom };
