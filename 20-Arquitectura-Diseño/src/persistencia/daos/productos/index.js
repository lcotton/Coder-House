import { PERS } from "../../../options/config.js";

let productosDao;

switch (PERS) {
  default:
    const { default: ProductosDaoMongoDb } = await import(
      "./ProductosDaoMongoDb.js"
    );
    productosDao = new ProductosDaoMongoDb();
    await productosDao.init();
}

export default class ProductosDaoFactory {
  static getDao() {
    return productosDao;
  }
}
