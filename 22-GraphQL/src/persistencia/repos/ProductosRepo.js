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

  async getProductos() {
    let dtos = await this.dao.getProductos();
    const productos = asModels(dtos);
    dtos = asDtos(productos);
    return dtos;
  }

  async createProducto({ datos }) {
    const dto = asDto(datos);
    await this.dao.createProducto(dto);
    return dto;
  }

  async deleteProducto({ nombre }) {
    const deleteProduct = await this.dao.deleteProducto(nombre);
    const productos = asModels(deleteProduct);
    const dto = asDtos(productos);
    return dto[0]
  }

  async updateProducto({ nombre, datos }) {
    const updateProduct = await this.dao.updateProducto(nombre, datos);
    const productos = asModels(updateProduct);
    const dto = asDtos(productos);
    return dto[0]
  }
}
