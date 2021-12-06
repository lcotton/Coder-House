import { promises as fs } from "fs";

class MensajesDaoFS {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async listarMensajes() {
    try {
      const objs = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async insertarMensaje (newMessage) {
    const chats = await this.listarMensajes()
    chats.mensajes.push(newMessage);
    const content = JSON.stringify(chats);
    try {
      return await fs.writeFile(this.ruta, content);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

}

export default MensajesDaoFS;
