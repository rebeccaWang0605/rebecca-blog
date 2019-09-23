const createConnection = require('./dbutil');

const insertComments = (blogId,parent,parentName,userName,comments,email,ctime,utime,success) =>{
    const insertSql = 'insert into comments(`blog_id`,`parent`,`parent_name`,`user_name`,`comments`,`email`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?)';
    const params = [blogId,parent,parentName,userName,comments,email,ctime,utime];
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

const queryComments = (blogId,offset,limit,success) =>{
    const querySql = 'select * from comments where blog_id = ? limit ?,?';
    const params = [blogId,offset,limit];
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

const queryCommentsCountByBlogId = (blogId,success) =>{
    const querySql = 'select count(1) as count from comments where blog_id = ?';
    const params = [blogId];
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

const queryNewComments = (size,success) =>{
    const querySql = 'select * from comments order by ctime desc limit ?';
    const params = [size];
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
    insertComments,
    queryComments,
    queryCommentsCountByBlogId,
    queryNewComments
}