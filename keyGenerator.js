const crypto = require('crypto');

class KeyGenerator {
    static generateKey(length) {
        return crypto.randomBytes(length);
    }
}

module.exports = KeyGenerator;
