import knexLib from 'knex'

class ProductoSql {
  constructor(config) {
    this.knex = knexLib(config)
  }

  crearTabla() {
    return this.knex.schema.dropTableIfExists('productos')
      .finally(() => {
        return this.knex.schema.createTable('productos', table => {
          table.increments('id').primary();
          table.string('nombre', 50).notNullable();
          table.float('precio').notNullable();
          table.string('foto', 1000).notNullable();
        })
      })
  }

  insertarProductos(productos) {
    return this.knex('productos').insert(productos)
  }

  listarProductos() {
    return this.knex('productos').select('*')
  }

  close() {
    this.knex.destroy();
  }
}

export default ProductoSql