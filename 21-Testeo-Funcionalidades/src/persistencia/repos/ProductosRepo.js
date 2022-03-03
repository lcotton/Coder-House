import { asDto, asModels, asDtos } from "../mappers/ProductoMappers.js";
import ProductosDaoFactory from "../../persistencia/daos/productos/index.js";
import logger from "../../logger.js";

export default class ProductosRepo {
  static instancia;
  constructor() {
    if (!ProductosRepo.instancia) {
      logger.info("ProductosRepo primera vez");
      this.dao = ProductosDaoFactory.getDao();
      ProductosRepo.instancia = this;
    } else {
      logger.info("ProductosRepo otras veces");
      return ProductosRepo.instancia;
    }
  }

  async listar() {
    let dtos = await this.dao.listar();
    const productos = asModels(dtos);
    dtos = asDtos(productos);
    return dtos;
  }

  async insertar(productoNuevo) {
    const dto = asDto(productoNuevo);
    return await this.dao.insertar(dto);
  }

  async borrar(nombreProducto) {
    return await this.dao.borrar(nombreProducto);
  }
}
