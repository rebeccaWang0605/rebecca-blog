const mysql = require('mysql');

const createConnection = () =>{
    return mysql.createConnection({
        host: '120.77.46.101',
        port: '3306',
        user: 'root',
        password: 'root',
        database:'my_blog'
    })
}

module.exports = createConnection;