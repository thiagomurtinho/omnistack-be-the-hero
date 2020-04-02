const crypto = require('crypto');

module.exports = function generateUniqueId(bytes = 4) {
  return crypto.randomBytes(bytes).toString('HEX');
};
