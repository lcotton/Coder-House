import { asDto, asModels, asDtos } from '../mappers/mensajesMapper.js'
import MensajesDaoFactory from "../../persistencia/daos/mensajes/index.js";
import logger from "../../logger.js";


export default class MensajesRepo {
  static instancia
  constructor() {
    if (!MensajesRepo.instancia){
      logger.info('MensajesRepo primera vez');
      this.dao = MensajesDaoFactory.getDao();
      MensajesRepo.instancia= this
    }else{
      logger.info('MensajesRepo otras veces')
      return MensajesRepo.instancia
    }
  }

  async listarMensajes() {
    let dtos = await this.dao.listarMensajes()
    const mensajes = asModels(dtos)
    dtos = asDtos(mensajes)
    return dtos
  }

  async insertarMensaje(mensaje) {
    const dto = asDto(mensaje)
    return await this.dao.insertarMensaje(dto)
  }
}
