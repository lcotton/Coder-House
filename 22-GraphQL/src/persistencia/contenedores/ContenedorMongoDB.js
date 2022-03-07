import mongoose from "mongoose";
import config from "../../options/config.js";
import logger from "../../logger.js";

class ContenedorMongoDb {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async init() {
    await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
    logger.info("productos dao en mongodb -> listo");
  }

  async createProducto(productoNuevo) {
    try {
      return await this.coleccion.create(productoNuevo);
    } catch (error) {
      logger.error(`Error al insertar un nuevo producto: ${error}`);
    }
  }

  async getProductos() {
    try {
      return await this.coleccion.find({}, { __v: 0, _id: 0 });
    } catch (error) {
      logger.error(`Error al listar los productos: ${error}`);
    }
  }

  async deleteProducto(nombreProducto) {
    const buscado = await this.coleccion.find(
      { nombre: nombreProducto },
      { __v: 0, _id: 0 }
    );
    if (buscado.length === 0) {
      return { error: "elemento no encontrado" };
    }
    try {
      await this.coleccion.deleteOne({ nombre: nombreProducto });
      return buscado;
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
    }
  }

  async updateProducto(nombreProducto, productoActualizado) {
    const buscado = await this.coleccion.find({ nombre: nombreProducto });
    let updateElem;
    if (buscado.length === 0) {
      return { error: "producto no encontrado" };
    } else {
      updateElem = { ...productoActualizado };
    }

    try {
      await this.coleccion.updateOne(
        { nombre: nombreProducto },
        { $set: updateElem }
      );
      return this.coleccion.find(
        { nombre: nombreProducto },
        { __v: 0, _id: 0 }
      );
    } catch (error) {
      logger.error(`Error en operación de base de datos ${error}`);
    }
  }
}

export default ContenedorMongoDb;
