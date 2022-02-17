import config, { PERS } from "../../../options/config.js";

let mensajesDao;

switch (PERS) {
  default:
    const { default: MensajesDaoFS } = await import(
      "./MensajesDaoFS.js"
    );
    mensajesDao = new MensajesDaoFS(config.fileSystem.path);
    break;
}

export { mensajesDao };
