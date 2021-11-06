
import Router from 'express';
import fs from 'fs';

const routerProductos = Router();


routerProductos.get('/', async (req, res) => {
    let productos = await fs.promises.readFile('./router/productos.txt','utf-8')
    productos = JSON.parse(productos)
    res.json(productos);
});


export {routerProductos}