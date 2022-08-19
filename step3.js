const fs = require('fs');
const process = require('process');
const axios = require('axios');

function output(writeText, obj) {
    if (obj) {
        fs.writeFile(obj, writeText, 'utf8', (err) => {
            if (err) {
                console.log(`Couldn't write ${obj} : ${err}`);
                process.exit(1)
            }
        });
    }
    else {
        console.log(text);
    }
}


function cat(path, obj) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
      } else {
        output(data, obj);
      }
    });
  }
  
  /** read page at URL and print it out. */
  
  async function webCat(url, obj) {
    try {
      let resp = await axios.get(url);
      output(resp.data, obj);
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
  }
  
  let path;
  let out;
  
  if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
  } else {
    path = process.argv[2];
  }
  
  if (path.slice(0, 4) === 'http') {
    webCat(path, out);
  } else {
    cat(path, out);
  }