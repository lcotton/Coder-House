import { generarProducto } from "../../../utils/generadorProductos.js";

class ProductosMocks {
  constructor() {}

  async popular(cant = 5) {
    const nuevos = [];
    for (let i = 0; i < cant; i++) {
      const nuevoProducto = generarProducto();
      nuevos.push(nuevoProducto);
    }
    return nuevos
  }
}
const productosMocks = new ProductosMocks()

export {productosMocks};
