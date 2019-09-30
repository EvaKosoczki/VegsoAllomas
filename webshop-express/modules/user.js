const mariadb = require('mariadb');
const sqlParser = require('./sqlGetParser');
const sqlDel = require('../modules/sqlDeleteParser');
const sqlInsert = require('../modules/sqlInsertParser');
const sqlUpdate = require('../modules/sqlUpdateParser');
const db = require('../modules/db');

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
            set: {
                cookie: token
            },
            where: {
                userId: id
            }
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
            where: {
                cookie: `${req.cookies.uuid}`
            }
        });
        console.log('Checklogin: ', sql);
        const result = await this.conn.query(sql[0], sql[1]);
        console.log('Checklogin2: ', result);
        return result[0];
    };
    async checkBasket(user) {
        let sql = await sqlParser({
            select: {
                'basket': 'orderItems',
                'quantity': 'quantity'
            },
            from: 'users',
            join: {
                join: "inner",
                table: 'baskets',
                userId: "user",
                join2: "inner",
                table2: '`basket-details`',
                basketId: 'basket'
            },
            where: {
                user: user
            }

        });
        console.log('proba', sql);
        const result = await this.conn.query(sql[0], sql[1]);
        return result;
    }
    async pagination(page = 0) {
        let sql1 = await sqlParser({
            select: {
                'count(ID)': 'amount'
            },
            from: 'snowboards'
        })
        const amount = await this.conn.query(sql1[0], sql1[1]);
        const lastPage = Math.ceil(amount[0].amount / 12);
        console.log('laspage',lastPage);
        let counter = 0;
        let result = {};
        result.prev = page == 0 ? 0 : parseInt(page) - 1;
        result.next = page == lastPage ? lastPage : parseInt(page) + 1;
        result.pages=[];
        for (let i = 0; i < lastPage - 2; i++) {
            let page = {};
            page.page=i;
            result.pages.push(page);
        }
        console.log('pages:',result.pages);
        return result;
    }
}