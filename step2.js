const fs = require('fs');
const process = require('process');
const axios = require('axios');


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


async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data)
    } catch(err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1)
    }
}

let p = process.argv[2];

if(p.slice(0, 4) === "http") {
    webCat(p);

}
else {
    cat(p);
}