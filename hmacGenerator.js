const crypto = require("crypto");

class HmacGenerator {
    generateHmac(key, message) {
        const keyHex = key.toString("hex");
        return crypto.createHmac("sha256", keyHex).update(message).digest("hex");
    }
}

module.exports = HmacGenerator;
