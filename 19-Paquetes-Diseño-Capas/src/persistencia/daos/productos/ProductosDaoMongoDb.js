import ContenedorMongoDb from '../../../persistencia/contenedores/ContenedorMongoDB.js'

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super('productos', {
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      foto: { type: String, required: true },
    })
  }
}

export default ProductosDaoMongoDb
