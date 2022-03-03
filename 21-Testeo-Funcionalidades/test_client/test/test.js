import axios from "axios";
import assert from "assert";
import { crearServidor } from "../src/server.js";

import { crearDao } from "../src/daos/productosDao.js";

const cosasDao = crearDao();

describe("almacenador", () => {
  const servidor = crearServidor({ puerto: 8080, cosasDao });
  const productoNuevo = {
    nombre: "Calculadora",
    precio: 69,
    foto: "https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/512/Calculator_512.png",
  };
  const productoActualizado = {
    nombre: "Calculadora",
    precio: 90,
    foto: "https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/512/Calculator_512.png",
  };

  before(async () => {
    await cosasDao.init();
    await servidor.conectar();
    axios.defaults.baseURL = "http://localhost:8080";
  });

  after(async () => {
    await servidor.desconectar();
  });

  it("debería comenzar vacío", async () => {
    const { data: cosas } = await axios.get("/");
    assert.deepStrictEqual(cosas, []);
  });

  it("debería poder agregar cosas", async () => {
    const cosasAntes = [...(await cosasDao.listar())];

    const { data: cosasActualizada } = await axios.post("/", productoNuevo);
    assert.deepStrictEqual(cosasActualizada, [...cosasAntes, productoNuevo]);
  });

  it("debería poder leer", async () => {
    const { data: cosas } = await axios.get("/");
  });

  it("debería poder actualizar cosas", async () => {
    const cosasAntes = [...(await cosasDao.buscar(productoNuevo.nombre))];
    const { data: cosasActualizada } = await axios.put(
      "/",
      productoActualizado
    );
    assert.notDeepStrictEqual(cosasActualizada, cosasAntes);
  });

  it("debería poder borrar", async () => {
    const { data: cosas } = await axios.delete("/", {
      data: { producto: productoActualizado.nombre },
    });
    assert.deepStrictEqual(cosas, []);
  });
});
