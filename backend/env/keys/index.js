// Chemin pour que ça marche sur docker mais pas localement
/*const fs = require('fs');


module.exports = {
    key: fs.readFileSync('./backend/env/keys/jwtRS256.key'),
    keyPub: fs.readFileSync('./backend/env/keys/jwtRS256.key.pub'),
}*/

// Chemin pour que ça marche en local mais pas docker
const fs = require('fs');

module.exports = {
    key: fs.readFileSync('./env/keys/jwtRS256.key'),
    keyPub: fs.readFileSync('./env/keys/jwtRS256.key.pub'),
}