import { PERS } from "../../../options/config.js";

let productosDao;

switch (PERS) {
  case "mongodb":
    const { default: ProductosDaoMongoDb } = await import(
      "./ProductosDaoMongoDb.js"
    );
    productosDao = new ProductosDaoMongoDb();
    break;
}

export { productosDao };
