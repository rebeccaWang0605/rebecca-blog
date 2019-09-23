const createConnection = require('./dbutil');

const queryTag = (tag,success) =>{
    const querySql = 'select * from tags where tag = ?';
    const params = [tag];
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err){
            console.log(err)
        }else{
            success(res)
        }
    })
    connection.end();
}

const insertTag = (tag,ctime,utime,success) =>{
    const insertSql = 'insert into tags(`tag`,`ctime`,`utime`) values (?,?,?)';
    const params = [tag,ctime,utime];
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

const queryAllTags = success =>{
   const querySql = 'select * from tags';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,(err,res) =>{
        if(err){
            console.log(err)
        }else{
            success(res)
        }
    })
    connection.end();
}

module.exports = {
    queryTag,
    insertTag,
    queryAllTags
}