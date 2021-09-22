const bcrypt = require("bcrypt");

function hashPassword(password) {
  const hashed = bcrypt.hashSync(password, 12);
  return hashed;
}
function compared(password, hashed) {
  return bcrypt.compareSync(password, hashed);
}

module.exports = { hashPassword , compared};
