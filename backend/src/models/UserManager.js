const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, email, hashedPassword) values (?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, city = ?, phone = ? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.city,
        user.phone,
        user.id,
      ]
    );
  }

  selectEmail(email) {
    return this.connection.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
  }

  selectToken(passwordToken) {
    return this.connection.query(
      `select * from ${this.table} where passwordToken = ?`,
      [passwordToken]
    );
  }

  getUserByName() {
    return this.connection.query(
      `SELECT ${this.table}.id AS user_id, CONCAT(firstname,' ',lastname) AS name FROM ${this.table}`
    );
  }

  updateAvatar(id, avatar) {
    return this.connection.query(
      `update ${this.table} set avatar = ? where id = ?`,
      [avatar, id]
    );
  }

  updateForgottenPassword(user) {
    return this.connection.query(
      `update ${this.table} set passwordToken = ? where id = ?`,
      [user.passwordToken, user.id]
    );
  }

  updatePasswordAfterReset(user) {
    return this.connection.query(
      `update ${this.table} set hashedPassword = ?, passwordToken = NULL  where id = ?`,
      [user.hashedPassword, user.id]
    );
  }

  getNumberOfUser() {
    return this.connection.query(
      `SELECT COUNT(email) AS users FROM ${this.table}`
    );
  }
}
module.exports = UserManager;
