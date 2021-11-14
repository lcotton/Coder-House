import knexLib from "knex";

class ChatSql {
  constructor(config) {
    this.knex = knexLib(config);
  }

  crearTabla() {
    return this.knex.schema.hasTable("chats", (exists) => {
      if (!exists) {
        return this.knex.schema.createTable("chats", (table) => {
          table.increments("id").primary();
          table.string("mail", 100).notNullable();
          table.string("mensaje", 2000).notNullable();
          table.text("timestamp").notNullable();
        });
      }
    });
  }

  insertarChats(chat) {
    return this.knex("chats").insert(chat);
  }

  listarChats() {
    return this.knex("chats").select("*");
  }

  // borrarChats() {
  //   return this.knex("chats").del();
  // }

  close() {
    this.knex.destroy();
  }
}

export default ChatSql;
