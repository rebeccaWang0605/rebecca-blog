const mysql = require('mysql');

const createConnection = () =>{
    return mysql.createConnection({
        host: '192.168.1.8',
        port: '3306',
        user: 'root',
        password: 'rebecca2010650403',
        database:'my_blog'
    })
}

module.exports = createConnection;