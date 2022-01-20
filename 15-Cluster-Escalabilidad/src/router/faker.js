import { Router } from "express";
import { productosMocks } from "../daos/productos/ProductosMocks.js";

const routerProductosRandom = new Router();

routerProductosRandom.get("/", async (req, res) => {
  const productos = await productosMocks.popular();
  res.json(productos);
});

export { routerProductosRandom };
