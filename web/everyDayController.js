const everyDao = require('../dao/everyDayDao');
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil')
const path = new Map();
const  insertEveryDay = (request,response) =>{
    request.on('data',data =>{
        console.log(data.toString().trim())
        const content = data.toString().trim();
        const ctime = timeUtil.getNowTime();
        everyDao.insertEveryDay(content,ctime,res =>{
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
        })
    })
}

const queryEveryDay = (request,response) =>{
    everyDao.queryEveryDay(res =>{
        if(res && res.length > 0 ){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end(); 
        }
    })
}

path.set('/insertEveryDay',insertEveryDay);
path.set('/queryEveryDay',queryEveryDay);
module.exports.path = path;