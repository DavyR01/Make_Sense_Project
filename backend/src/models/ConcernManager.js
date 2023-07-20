const AbstractManager = require("./AbstractManager");

class ConcernManager extends AbstractManager {
  constructor() {
    super({ table: "person_concern" });
  }

  getConcernUser(id) {
    return this.connection.query(
      `SELECT user_id, firstname, lastname , avatar
      FROM ${this.table}
      JOIN user ON ${this.table}.user_id = user.id
      WHERE decision_id = ?`,
      [id]
    );
  }

  insert(decisionId, concerns) {
    const values = concerns.map((concern) => [concern.user_id, decisionId]);
    return this.connection.query(
      `insert into ${this.table} (user_id, decision_id) values ?`,
      [values]
    );
  }

  deleteConcern(decisionId) {
    return this.connection.query(
      `DELETE FROM ${this.table} where decision_id = ?`,
      [decisionId]
    );
  }
}

module.exports = ConcernManager;
