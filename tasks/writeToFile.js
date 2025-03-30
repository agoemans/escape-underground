const fs = require('fs');

async function writeToFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

module.exports = {writeToFile};