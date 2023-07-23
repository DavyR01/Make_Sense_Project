const AbstractManager = require("./AbstractManager");

class DecisionManager extends AbstractManager {
  constructor() {
    super({ table: "decision" });
  }

  insert(decision) {
    return this.connection.query(
      `insert into ${this.table} (title, content, impact, risk, benefits, date_decision_creation, date_decision_final, status_decision, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        decision.title,
        decision.content,
        decision.impact,
        decision.risk,
        decision.benefits,
        decision.date_decision_creation,
        decision.date_decision_final,
        decision.status_decision,
        decision.user_id,
      ]
    );
  }

  update(decision) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [decision.title, decision.id]
    );
  }

  updateById(decision) {
    return this.connection.query(
      `update ${this.table} set title = ?, content = ?, impact = ?, risk = ?, benefits = ?, status_decision = ?, date_decision_final = ? where id = ?`,
      [
        decision.title,
        decision.content,
        decision.impact,
        decision.risk,
        decision.benefits,
        decision.status_decision,
        decision.date_decision_final,
        decision.id,
      ]
    );
  }

  findAllWithUserId() {
    return this.connection.query(
      `SELECT ${this.table}.id, title, content, impact, risk, benefits, date_decision_creation, date_decision_final, status_decision, user_id, firstname, lastname, avatar
    FROM ${this.table}
    LEFT JOIN user on ${this.table}.user_id = user.id
    ORDER BY date_decision_creation ASC`
    );
  }

  findAllByIdWithUserId(id) {
    return this.connection.query(
      `SELECT ${this.table}.id, title, content, impact, risk, benefits, date_decision_creation, date_decision_final,status_decision, ${this.table}.user_id
    FROM ${this.table} 
    WHERE ${this.table}.id = ?`,
      [id]
    );
  }

  find(id) {
    return this.connection.query(
      `SELECT ${this.table}.id, title, content, impact, risk, benefits, date_decision_creation, date_decision_final, status_decision, ${this.table}.user_id, firstname, lastname, avatar
    FROM ${this.table} 
    LEFT JOIN user ON ${this.table}.user_id = user.id
    WHERE ${this.table}.id = ?`,
      [id]
    );
  }

  findByUserId(id) {
    return this.connection.query(
      `SELECT ${this.table}.id, title, date_decision_creation, date_decision_final, status_decision, user_id, firstname, lastname, avatar 
    FROM ${this.table}
    JOIN user on ${this.table}.user_id = user.id
    WHERE user_id = ?`,
      [id]
    );
  }

  findLastdecision() {
    return this.connection.query(
      `SELECT date_decision_final, title, status_decision FROM ${this.table}
      WHERE status_decision = "En cours" 
      OR status_decision = "En conflit"
      ORDER BY date_decision_final DESC LIMIT 0,5;`
    );
  }

  // A voir
  findIdByVoteAndDateDecisionPour() {
    return this.connection.query(
      `SELECT comment.decision_id,
      SUM(case when comment.vote = 'Pour' then 1 else 0 end) AS nbVotePour,
      SUM(case when comment.vote = 'Contre' then 1 else 0 end) AS nbVoteContre
      FROM comment
      JOIN decision ON decision.id = comment.decision_id
      WHERE comment.date_creation = (SELECT MAX(date_creation))
      AND comment.date_creation <= DATE_SUB(NOW(), INTERVAL 10 MONTH)
      GROUP BY decision_id
      HAVING nbVoteContre = 0;`
    );
  }

  updateStatusTerminee(ids) {
    return this.connection.query(
      `UPDATE ${this.table}
      SET status_decision = 'Terminee'
      WHERE decision.id IN (?)
      AND status_decision = 'En cours'`,
      [ids]
    );
  }

  // A voir
  findIdByVoteAndDateDecisionContre() {
    return this.connection.query(
      `SELECT comment.decision_id,
      SUM(case when comment.vote = 'Pour' then 1 else 0 end) AS nbVotePour,
      SUM(case when comment.vote = 'Contre' then 1 else 0 end) AS nbVoteContre
      FROM comment
      JOIN decision ON decision.id = comment.decision_id
      WHERE comment.date_creation = (SELECT MAX(date_creation))
      AND comment.date_creation <= DATE_SUB(NOW(), INTERVAL 10 MONTH)
      GROUP BY decision_id
      HAVING nbVoteContre > 0;`
    );
  }

  updateStatusNonAboutie(ids) {
    return this.connection.query(
      `UPDATE ${this.table}
      SET status_decision = 'Non aboutie'
      WHERE decision.id IN (?)
      AND status_decision = 'En cours'`,
      [ids]
    );
  }
  // decision.id IN (?) : cette condition vérifie si l'identifiant de la décision se trouve dans le tableau ids passé en tant qu'argument.

  updateStatusTermineeByDateConflict() {
    return this.connection.query(
      `UPDATE ${this.table}
      SET status_decision = 'Terminee'
      WHERE date_decision_final <= NOW()
      AND status_decision = 'En cours'`
    );
  }

  updateStatusNonAboutieByDateConflict() {
    return this.connection.query(
      `UPDATE ${this.table}
      SET status_decision = 'Non aboutie'
      WHERE date_decision_final <= NOW()
      AND status_decision = 'En conflit'`
    );
  }

  getNumberOfDecision() {
    return this.connection.query(
      `SELECT COUNT(id) as decisions FROM ${this.table}`
    );
  }

  getNumberOfDecisionAccepted() {
    return this.connection.query(
      `SELECT COUNT(status_decision) as decisionsAccepted FROM ${this.table} where status_decision = 'Terminee'`
    );
  }

  getNumberOfDecisionInProgress() {
    return this.connection.query(
      `SELECT COUNT(status_decision) as decisionsInProgress FROM ${this.table} where status_decision = 'En cours'`
    );
  }

  getNumberOfDecisionConflict() {
    return this.connection.query(
      `SELECT COUNT(status_decision) as decisionsconflict FROM ${this.table} where status_decision = 'En conflit'`
    );
  }

  getNumberOfDecisionUnresolved() {
    return this.connection.query(
      `SELECT COUNT(status_decision) as decisionsunresolved FROM ${this.table} where status_decision = 'Non aboutie'`
    );
  }

  findNbOfDecisions(status) {
    return this.connection.query(
      `SELECT count(${this.table}.id) as nbDecision
      FROM ${this.table}
      WHERE (status_decision = '${status}' or '${status}' = 'all')`
    );
  }

  findByPageAndFilter(limit, offset, status) {
    return this.connection.query(
      `SELECT ${this.table}.id, title, date_decision_creation, date_decision_final, status_decision, user_id, firstname, lastname, avatar
      FROM ${this.table}
      JOIN user on ${this.table}.user_id = user.id
      WHERE (status_decision = '${status}' or '${status}' = 'all')
      ORDER BY date_decision_final ASC
      LIMIT ${limit} OFFSET ${offset}`
    );
  }

  findAllNbOfDecisions() {
    return this.connection.query(
      `SELECT count(${this.table}.id) as nbDecision
      FROM ${this.table}`
    );
  }

  findAllByPageAndFilter(limit, offset) {
    return this.connection.query(
      `SELECT ${this.table}.title, ${this.table}.date_decision_creation,
      ${this.table}.date_decision_final, ${this.table}.status_decision,
      ${this.table}.id as decisionId,
       u.id as userId, u.firstname, u.lastname,
       concerned.id as concernedId, experted.id as expertedId,
       concerned.firstname AS concernedFirstname, concerned.lastname AS concernedLastname,
       experted.lastname AS expertedLastname, experted.firstname AS expertedFirstname
       FROM ${this.table}
       left JOIN user AS u ON ${this.table}.USER_ID = u.id
       left JOIN person_concern as pc ON ${this.table}.id = pc.decision_id
       left JOIN user AS concerned on pc.user_id=concerned.id
       left JOIN person_expert as pe ON ${this.table}.id = pe.decision_id
       left JOIN user AS experted on pe.user_id=experted.id
       LIMIT ${limit} OFFSET ${offset}`
    );
  }
}

module.exports = DecisionManager;
