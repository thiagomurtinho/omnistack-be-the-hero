const knex = require('knex');
const configDB = require('../../knexfile');

const connectionDB = knex(configDB.development);

module.exports = connectionDB;
