const createConnection = require('./dbutil');

const insertBlog = (title,content,views,utime,tags,ctime,success) =>{
    const insertSql = 'insert into blog(`title`,`content`,`views`,`utime`,`tags`,`ctime`) values (?,?,?,?,?,?)';
    const params = [title,content,views,utime,tags,ctime];
    const connection = createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const queryBlogByPage = (offset,limit,success) =>{
    const querySql = 'select * from blog order by id desc limit ?,?';
    const params = [offset,limit];
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const queryTotalBlog = (success) =>{
    const querySql = 'select count(1) as count from blog';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const queryBlogById = (id,success) =>{
    const querySql = 'select * from blog where id = ?';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,[id],(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const  queryAllBlog = success =>{
    const querySql = 'select * from blog';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const addViews = (id,success) => {
    const updateSql = 'update blog set views = views + 1 where id = ?';
    const connection = createConnection();
    const params = [id];
    connection.connect();
    connection.query(updateSql,params,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const queryHotBlogBySize = (size,success) =>{
    const querySql = 'select * from blog order by views desc limit ?';
    const connection = createConnection();
    const params = [size];
    connection.connect();
    connection.query(querySql,params,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const queryBlogByTag = (tag,offset,limit,success) =>{
    const querySql = 'select * from blog where tags like ? order by id desc limit ?,?';
    const params = [tag,offset,limit];
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}


const queryBlogByTagCount = (tag,success) =>{
    const querySql = 'select count(1) as count from blog where tags like ?';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,[tag],(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const queryBlogBySearchWord = (params,success) =>{
    const querySql = 'select * from blog where tags like ? or content like ? or title like ? order by id desc limit ?,?';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

const queryBlogBySearchWorCount = (params,success) =>{
    // `title`,`content`,`views`,`utime`,`tags`,`ctime`
    const querySql = 'select count(1) as count from blog where tags like ? or content like ? or title like ?';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) => {
        if(err){
            console.log(err)
        }else{
            success(res);
        }
    })
    connection.end();
}

module.exports = {
    insertBlog,
    queryBlogByPage,
    queryTotalBlog,
    queryBlogById,
    queryAllBlog,
    addViews,
    queryHotBlogBySize,
    queryBlogByTag,
    queryBlogByTagCount,
    queryBlogBySearchWord,
    queryBlogBySearchWorCount
}