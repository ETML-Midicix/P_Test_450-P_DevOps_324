const fs = require('fs');

module.exports = {
    key: fs.readFileSync('./jwtRS256.key'),
    keyPub: fs.readFileSync('./jwtRS256.key.pub'),
}