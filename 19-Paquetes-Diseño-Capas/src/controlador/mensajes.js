import { normalize, schema } from "normalizr";

const normalizarMensajes = async (mensajes) => {
  const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
  const messageSchema = new schema.Entity("mensajes", {
    author: authorSchema,
  });
  const chatSchema = new schema.Entity("chat", {
    mensajes: [messageSchema],
  });

  return normalize(mensajes, chatSchema);
};

export { normalizarMensajes };
