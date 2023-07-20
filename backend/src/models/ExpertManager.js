const AbstractManager = require("./AbstractManager");

class ExpertManager extends AbstractManager {
  constructor() {
    super({ table: "person_expert" });
  }

  getExpertUser(decisionId) {
    return this.connection.query(
      `SELECT user_id, firstname , lastname, avatar, decision_id
      FROM ${this.table}
      JOIN user ON ${this.table}.user_id = user.id
      WHERE decision_id = ?`,
      [decisionId]
    );
  }

  insert(decisionId, experts) {
    const values = experts.map((expert) => [expert.user_id, decisionId]);
    return this.connection.query(
      `insert into ${this.table} (user_id, decision_id) values ?`,
      [values]
    );
  }

  deleteExpert(decisionId) {
    return this.connection.query(
      `DELETE FROM ${this.table} where decision_id = ?`,
      [decisionId]
    );
  }
}

module.exports = ExpertManager;
