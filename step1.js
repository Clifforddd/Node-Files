const fs = require('fs');
const process = require('process');

function cat(p) {
    fs.readFile(p, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${p}: ${err}`);
            process.exit(2);
        }
        else {
            console.log(data);
        }
    });
}
cat(process.argv[2]);
