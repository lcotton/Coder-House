import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDb {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async insertar(elemento) {
    try {
      return await this.coleccion.create(elemento);
    } catch (error) {
      console.log(`Error en operación de base de datos ${error}`);
    }
  }

  async listar() {
    try {
      return await this.coleccion.find({}, { __v: 0, _id: 0 });
    } catch (error) {
      console.log(`Error en operación de base de datos ${error}`);
    }
  }
}

export default ContenedorMongoDb;
