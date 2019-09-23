const blogController = require('../dao/blogDao')
const timeUtil = require('../util/timeUtil');
const respUtil = require('../util/respUtil');
const tagController = require('../dao/tagDao');
const tagBlogMappingController = require('../dao/mappingDao');
const url = require('url')
const path = new Map();

const insertTagBlogMapping = (tagId,blogId) =>{
    tagBlogMappingController.insertTagBlogMapping(tagId,blogId,timeUtil.getNowTime(),timeUtil.getNowTime(),res =>{

    })
}

const insertTag = (tag,blogId) =>{
    tagController.insertTag(tag,timeUtil.getNowTime(),timeUtil.getNowTime(),res =>{
        let tagId = res.insertId;
        insertTagBlogMapping(tagId,blogId);
    })
}

const queryTag = (tag,blogId) =>{
    tagController.queryTag(tag,res =>{
        if(!res || res.length == 0){
            insertTag(tag,blogId); 
        }else{
            insertTagBlogMapping(res[0].id,blogId);
        }
    })
}

const insertBlog = (request,response) =>{
    request.on('data',data =>{
        const params = url.parse(request.url,true).query;
        const content = data.toString();
        const tags = params.tags.replace(/ /g,'').replace(/，/g,',');
        blogController.insertBlog(params.title,content,0,timeUtil.getNowTime(),tags,timeUtil.getNowTime(),res =>{
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null))
            response.end();
            let blogId = res.insertId;
            let tagList = tags.split(',');
            for(let i = 0; i < tagList.length; i++){
                if(tagList[i] == ''){
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        })

    })
}

const queryBlogByPage = (request,response) =>{
    const params = url.parse(request.url,true).query;
    const limit = parseInt(params.page);
    const offset =( parseInt(params.curPage)-1) * limit;
    blogController.queryBlogByPage(offset,limit,res =>{
        if(res && res.length > 0){
            for(let i = 0; i < res.length; i++){
                res[i].content = res[i].content.replace(/<[\w\W]*>/g,'').replace(/<img[\w\W]*">/g,'');
            }
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end();
        }
    })
}

const queryTotalBlog = (request,response) =>{
    blogController.queryTotalBlog(res =>{
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功',res));
        response.end();
    })
}

const queryBlogById = (request,response) =>{
    const params = url.parse(request.url,true).query;
    blogController.queryBlogById(parseInt(params.bid), res =>{
        if(res && res.length > 0){
            // for(let i = 0; i < res.length; i++){
            //     res[i].content = res[i].content.replace(/<img[\w\W]*">/g,'');
            // }
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end();
        }
        blogController.addViews(parseInt(params.bid),res => {});
    })
}

const queryAllBlog = (request,response) =>{
    blogController.queryAllBlog(res =>{
        if(res && res.length > 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end();
        }
    })
}

const queryHotBlogBySize = (request,response) =>{
    const params = url.parse(request.url,true).query;
    blogController.queryHotBlogBySize(parseInt(params.size),res =>{
        if(res && res.length > 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end();
        }
    })
}

const queryBlogByTag = (request,response) =>{
    const params = url.parse(request.url,true).query;
    const tag = params.tag;
    const limit = parseInt(params.page);
    const offset = ( parseInt(params.curPage)-1 ) * limit;
    let blogList = [];
    tagController.queryTag(tag,res =>{
        // console.log(res);
        if(res && res.length > 0){
            tagBlogMappingController.queryTagBlogMapping(res[0].id,offset,limit,result =>{
                // console.log(result);
                for(let i = 0; i < result.length; i++){
                    blogController.queryBlogById(result[i].blog_id, data =>{
                        // console.log(data[0])
                        data[0].content = data[0].content.replace(/<[\w\W]*>/g,'').replace(/<img[\w\W]*">/g,'')
                        // data[0].content = data[0].content.replace(/<img[\w\W]*">/g,'');
                        blogList.push(data[0]);
                    })
                }
                getResult(blogList,result.length,response);   
            })
        }
    })
}

const queryBlogByTagCount = (request,response) =>{
    const params = url.parse(request.url,true).query;
    const tag = params.tag;
    tagController.queryTag(tag,res =>{
        if(res && res.length > 0){
            tagBlogMappingController.queryTagBlogMappingCount(res[0].id,result =>{
                response.writeHead(200);
                response.write(respUtil.writeResult('success','请求成功',result));
                response.end();
            })
        }
    })
}

function getResult(blogList,len,response){
    if(blogList.length < len){
        setTimeout(() =>{
            getResult(blogList,len,response);
        },10)
    }else{
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功',blogList));
        response.end();
    }
}

const queryBlogBySearchWord = (request,response) =>{
    const params = url.parse(request.url,true).query;
    const searchWord = params.searchWord;
    const limit = parseInt(params.page);
    const offset =( parseInt(params.curPage)-1) * limit;
    const data = [`%${searchWord}%`,`%${searchWord}%`,`%${searchWord}%`,offset,limit];
    blogController.queryBlogBySearchWord(data,res =>{
        if(res && res.length > 0){
            for(let i = 0; i < res.length; i++){
                res[i].content = res[i].content.replace(/<[\w\W]*>/g,'').replace(/<img[\w\W]*">/g,'');
                // res[i].content = res[i].content.replace(/<img[\w\W]*">/g,'');
            }
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功',res));
            response.end();
        }else{
            response.writeHead(200);
            response.write(respUtil.writeResult('success','请求成功','sorry,the article is not exist'));
            response.end();
        }
    })
}

const queryBlogBySearchWorCount = (request,response) =>{
    const params = url.parse(request.url,true).query;
    const searchWord = params.searchWord;
    const data = [`%${searchWord}%`,`%${searchWord}%`,`%${searchWord}%`];
    blogController.queryBlogBySearchWorCount(data,res =>{
        response.writeHead(200);
        response.write(respUtil.writeResult('success','请求成功',res));
        response.end();
    })
}

path.set('/insertBlog',insertBlog);
path.set('/queryBlogByPage',queryBlogByPage);
path.set('/queryTotalBlog',queryTotalBlog);
path.set('/queryBlogById',queryBlogById);
path.set('/queryAllBlog',queryAllBlog);
path.set('/queryHotBlogBySize',queryHotBlogBySize);
path.set('/queryBlogByTag',queryBlogByTag);
path.set('/queryBlogByTagCount',queryBlogByTagCount);
path.set('/queryBlogBySearchWord',queryBlogBySearchWord);
path.set('/queryBlogBySearchWorCount',queryBlogBySearchWorCount)



module.exports.path = path;
