const fs = require('fs');
const files = fs.readFileSync('./server.conf');
const fileArr = files.toString().split('\r\n');

const globalConfig = {};
for(let i = 0; i < fileArr.length; i++){
    const temp = fileArr[i].split('=');
    globalConfig[temp[0]] = temp[1];
}

module.exports = globalConfig;