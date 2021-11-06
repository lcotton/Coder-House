import Router from "express";
import fs from "fs";

const routerCarritos = Router();

routerCarritos.get("/:id/productos", async (req, res) => {
  let carritos = await fs.promises.readFile("./archivos/carritos.txt", "utf-8");
  carritos = JSON.parse(carritos);
  const id = parseInt(req.params.id);
  const carritoBuscado = carritos.filter((p) => p.id === id);
  if (carritoBuscado.length === 0) {
    return res.json({ error: "carrito no encontrado" });
  } else {
    return res.json(carritoBuscado[0].productos);
  }
});

export { routerCarritos };
