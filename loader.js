const fs = require('fs');
const globalConfig = require('./config');

const files = fs.readdirSync(globalConfig.web_path);
const pathMap = new Map();

const init = app =>{
    for(let i = 0; i < files.length; i++){
        const temp = require(`./${globalConfig.web_path}/${files[i]}`);
        if(temp.path){
            for(let [k,v] of temp.path){
                if(pathMap.get(k)){
                    throw new Error(`请求异常url:${k}`)
                }else{
                    pathMap.set(k,v);
                    app.use(k,v)
                }
            }
        }
    } 
}

module.exports.init = init;