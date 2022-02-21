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

  async insertar(productoNuevo) {
    try {
      await this.coleccion.create(productoNuevo);
    } catch (error) {
      logger.error(`Error al insertar un nuevo producto: ${error}`);
    }
  }

  async listar() {
    try {
      return await this.coleccion.find({}, { __v: 0, _id: 0 });
    } catch (error) {
      logger.error(`Error al listar los productos: ${error}`);
    }
  }
}

export default ContenedorMongoDb;
