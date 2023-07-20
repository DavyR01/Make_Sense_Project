const AbstractManager = require("./AbstractManager");

class NotificationManager extends AbstractManager {
  constructor() {
    super({ table: "notification" });
  }

  findNotificationByUserId(id) {
    return this.connection.query(
      `SELECT decision_id, ${this.table}.user_id, title, firstname, lastname, avatar FROM ${this.table} 
      JOIN decision ON ${this.table}.decision_id = decision.id
      JOIN user ON ${this.table}.user_id = user.id
      WHERE ${this.table}.user_id = ?`,
      [id]
    );
  }

  insert(decisionId, persons) {
    const values = persons.map((person) => [person.user_id, decisionId]);
    return this.connection.query(
      `insert into ${this.table} (user_id, decision_id) values ?`,
      [values]
    );
  }

  deleteNotificationByDecisionId(decisionId) {
    return this.connection.query(
      `DELETE FROM ${this.table} where decision_id = ?`,
      [decisionId]
    );
  }
}

module.exports = NotificationManager;
