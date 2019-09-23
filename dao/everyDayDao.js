const createConnection = require('./dbutil');

const insertEveryDay = (content,ctime,success) =>{
    const insertSql = 'insert into every_day(`content`,`ctime`) values (?,?)'
    const connection = createConnection();
    const params = [content,ctime];
    connection.connect();
    connection.query(insertSql,params,(err,res) => {
        if(err){
            console.log(err);
        }else{
            success(res);
        }
    })
    connection.end();
}

const queryEveryDay = success =>{
    const querySql = 'select * from every_day order by ctime desc limit 1';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,(err,res) => {
        if(err){
            console.log(err);
        }else{
            success(res);
        }
    })
    connection.end();
}

module.exports = {
    insertEveryDay,
    queryEveryDay
}