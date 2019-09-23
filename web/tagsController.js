const tagsController = require('../dao/tagDao')
const respUtil = require('../util/respUtil')
const path = new Map();
const queryAllTags = (request,response) =>{
    tagsController.queryAllTags(res =>{
        if(res && res.length > 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end();
        }
    })
}
path.set('/queryAllTags',queryAllTags);

module.exports.path = path;