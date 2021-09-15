const bcrypt = require('bcrypt');

function hashPassword(password) {
    const hashed = bcrypt.hashSync(password, 12);
    return hashed;
}

module.exports = { hashPassword};
