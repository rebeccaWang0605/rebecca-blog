const testController = require('../dao/testDao');

const path = new Map();
 
const test = (request,response) =>{
    testController.test(res =>{
        // console.log('ok',res)
        response.writeHead(200),
        response.write('ok');
        response.end();
    })
}

path.set('/test',test);

module.exports.path = path;