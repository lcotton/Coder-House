import faker from 'faker'
faker.locale = 'es'

function generarProducto() {
  return {
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    foto: faker.image.business()
  }
}

export { generarProducto }