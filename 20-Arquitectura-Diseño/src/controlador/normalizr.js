import { normalize, schema } from "normalizr";

const normalizarMensajes = async (mensajes) => {
  const authorSchema = new schema.Entity(
    "author",
    {},
    { idAttribute: "email" }
  );
  const messageSchema = new schema.Entity("mensajes", {
    author: authorSchema,
  });
  const chatSchema = [messageSchema];

  return normalize(mensajes, chatSchema);
};

export { normalizarMensajes };
