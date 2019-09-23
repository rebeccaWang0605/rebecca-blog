const createConnection = require('./dbutil');

const insertTagBlogMapping = (tagId,blogId,ctime,utime,success) =>{
    const insertSql = 'insert into tag_blog_mapping(`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?)';
    const params = [tagId,blogId,ctime,utime];
    const connection = createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err){
            console.log(err)
        }else{
            success(res)
        }
    })
    connection.end();
}

const queryTagBlogMapping = (tagId,offset,limit,success) =>{
    const querySql = 'select * from tag_blog_mapping where tag_id = ? limit ?,?';
    const connection = createConnection();
    const params = [tagId,offset,limit];
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

const queryTagBlogMappingCount = (tagId,success) =>{
    const querySql = 'select count(1) as count from tag_blog_mapping where tag_id = ?';
    const connection = createConnection();
    const params = [tagId];
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
    insertTagBlogMapping,
    queryTagBlogMapping,
    queryTagBlogMappingCount
}