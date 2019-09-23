const createConnection = require('./dbutil');

const test = (success) =>{
    const querySql = 'select * from blog';
    const connection = createConnection();
    connection.connect();
    connection.query(querySql,(err,res) =>{
        if(err){
            console.log(err);
        }else{
            success(res);
        }
    })
    connection.end();
}

module.exports = {
    test
}