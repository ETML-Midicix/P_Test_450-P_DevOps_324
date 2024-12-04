/*const fs = require('fs');

module.exports = {
    key: fs.readFileSync('./jwtRS256.key'),
    keyPub: fs.readFileSync('./jwtRS256.key.pub'),
}
*/
const fs = require('fs');

module.exports = {
    key: fs.readFileSync('./backend/env/keys/jwtRS256.key'),
    keyPub: fs.readFileSync('./backend/env/keys/jwtRS256.key.pub'),
}