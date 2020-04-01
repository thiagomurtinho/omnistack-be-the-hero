const knex = require('knex');
const configDB = require('../../knexfile');

const connectionDB = knex(
  process.env.NODE_ENV === 'test' ? configDB.test : configDB.development
);

module.exports = connectionDB;
