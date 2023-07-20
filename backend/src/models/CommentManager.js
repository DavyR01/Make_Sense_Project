const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  // used in decision controller to enable fetch of the comments when fetching the decision data
  getComments(decisionId) {
    return this.connection.query(
      `SELECT comment.id, comment.content, comment.vote, comment.date_creation, comment.user_id, comment.decision_id, user.firstname, user.lastname, user.avatar
      FROM ${this.table}
      JOIN user on ${this.table}.user_id = user.id 
      WHERE decision_id = ?`,
      [decisionId]
    );
  }

  // used in comment controller to enable the post of new comments on the front
  insertComment(comment) {
    return this.connection.query(
      `INSERT into ${this.table} (content, vote, date_creation, user_id, decision_id) values ( ?, ?, ?, ?, ?)`,
      [
        comment.content,
        comment.vote,
        comment.date_creation,
        comment.user_id,
        comment.decision_id,
      ]
    );
  }

  // functinnal but not deployed on front end yet
  updateComment(comment) {
    return this.connection.query(
      `update ${this.table} set content = ?, vote = ? where id=? `,
      [comment.content, comment.vote, comment.id]
    );
  }

  // findCommentWithUserInfo(id) {
  //   return this.connection.query(
  //     `select content, vote, comment.date_creation, user_id, firstname, lastname, avatar from  ${this.table}
  //     JOIN user on ${this.table}.user_id = user.id
  //     where comment.id = ?`,
  //     [id]
  //   );
  // }

  deleteCommentByDecisionId(decisionId) {
    return this.connection.query(
      `DELETE FROM ${this.table} where decision_id = ?`,
      [decisionId]
    );
  }
}

module.exports = CommentManager;
