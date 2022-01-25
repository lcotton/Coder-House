import mongoose from "mongoose";
import config from "../config.js";
import logger from "../logger.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDb {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async insertar(elemento) {
    try {
      return await this.coleccion.create(elemento);
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
