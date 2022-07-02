const { Model } = require("objection");
const Knex = require("../../index");
Model.knex(Knex);

class Email extends Model {
  static get tableName() {
    return "emails";
  }
}

module.exports = Email;
