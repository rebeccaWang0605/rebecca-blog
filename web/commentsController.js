const commentsController = require('../dao/commentsDao')
const url = require('url');
const path = new Map();
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const captcha = require('svg-captcha');
const insertComments = (request,response) =>{
    const params = url.parse(request.url,true).query;
    commentsController.insertComments(parseInt(params.bid),parseInt(params.parent),params.parentName,params.userName,params.comments,params.email,timeUtil.getNowTime(),timeUtil.getNowTime(),res =>{
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',null));
        response.end();
    })
}

const queryRandomCode = (request,response) =>{
    const img = captcha.create({fontSize:50,width:100,height:34});
    response.writeHead(200);
    response.write(respUtil.writeResult('success','添加验证码成功',img));
    response.end();
}

const queryComments = (request,response) =>{
    const params = url.parse(request.url,true).query;
    const bid = parseInt(params.bid);
    const limit = parseInt(params.page);
    const offset = ( parseInt(params.curPage)-1 ) * limit;
    commentsController.queryComments(bid,offset,limit, res =>{
        if(res && res.length > 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end();
        }
    })
}

const queryCommentsCountByBlogId = (request,response) =>{
    const params = url.parse(request.url,true).query;
    commentsController.queryCommentsCountByBlogId(parseInt(params.bid), res =>{
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功',res));
        response.end();
    })
}

const queryNewComments = (request,response) =>{
    const params = url.parse(request.url,true).query;
    commentsController.queryNewComments(parseInt(params.size),res =>{
        if(res && res.length > 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end();
        }
    })
}

path.set('/insertComments',insertComments);
path.set('/queryRandomCode',queryRandomCode);
path.set('/queryComments',queryComments);
path.set('/queryCommentsCountByBlogId',queryCommentsCountByBlogId);
path.set('/queryNewComments',queryNewComments);

module.exports.path = path;