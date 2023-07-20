const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "message_help" });
  }

  insertMessage(message) {
    return this.connection.query(
      `insert into ${this.table} (username, email, objet, content) values (?, ?, ?, ?)`,
      [message.username, message.email, message.objet, message.content]
    );
  }

  deleteMessage(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = MessageManager;
