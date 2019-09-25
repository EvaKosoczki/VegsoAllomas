const mariadb = require('mariadb');
const sqlParser = require('./sqlGetParser');
const sqlDel = require('../modules/sqlDeleteParser');
const sqlInsert = require('../modules/sqlInsertParser');
const sqlUpdate = require('../modules/sqlUpdateParser');
const DB = require('../modules/db');
const db = new DB();

const pool = mariadb.createPool({
    user: 'root',
    password: 'root',
    database: 'webshop',
    connectionLimit: 5,
});

module.exports = class UserDB {
    constructor() {
        pool.getConnection().then((conn) => {
            this.conn = conn;
        });
    }

    //Update database with the new token:
    async setUserToken(id, token) {
        const sql = await sqlUpdate({
            table: 'users',
            set: { cookie: token },
            where: { userId: id }
        })
        const result = await this.conn.query(sql);
        return result;
    };



    //Checking if user is logged in or not:
    async checkLogin(req) {
        if (!req.cookies.uuid) {
            return false;
        }
        const sql = await sqlParser({
            select: '*',
            from: 'users',
            where: { cookie: `${req.cookies.uuid}` }
        });
        console.log('Checklogin: ', sql);
        const result = await this.conn.query(sql[0], sql[1]);
        console.log('Checklogin2: ', result);
        return result[0];
    };

}