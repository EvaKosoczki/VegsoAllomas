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
    connectionLimit: 6,
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
                'sum(quantity)': 'orderItems'
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
        return result[0].orderItems;
    }
    async pagination(page = 0, sql) {
        let amount =0;
        let lastPage =0;
        console.log('lekeres',sql);
        if(typeof sql === 'string'){
            let result= await this.conn.query(sql);
            amount = result.length;
            lastPage = Math.ceil(amount / 12);
        } else {
        let sql1 = await sqlParser(sql)
         amount = await this.conn.query(sql1[0], sql1[1]);
         lastPage = Math.ceil(amount[0].amount / 12);
        }
        let counter = 0;
        let result = {};
        result.prev = parseInt(page) - 1;
        result.next = parseInt(page) + 1;
        result.pages = [];
        result.last = lastPage;
        for (let i = 0; i < lastPage; i++) {
            let page = {};
            page.page = i;
            result.pages.push(page);
        }
        console.log('pages:', result.pages);
        return result;
    }
    async filter(filters) {
        let sql = 'select * from snowboards where';
        let filterArray = await this.setFilterArray(filters);
        let filterBrands = await this.setSqlArray('brand', filterArray);
        let filterShapes = await this.setSqlArray('shape', filterArray);
        let filterPurpose = await this.setSqlArray('purpose', filterArray);
        if (filterBrands.length > 0) {
            sql += await this.setSql('brand', filterBrands);
        }
        if(filterShapes.length>0){
            if(sql.indexOf('brand')>-1){
            sql+= ' and ';
            }
            sql += await this.setSql('shape', filterShapes);
        }
        if(filterPurpose.length>0){
            if(sql.indexOf('brand')>-1 || sql.indexOf('shape')>-1){
                sql+= ' and ';
                }
            sql += await this.setSql('purpose', filterPurpose);
        }
        console.log('filterSql',sql);
        // let result = await this.conn.query(sql);
        return sql;
    }
    async setFilterArray(filters) {
        let keys = Object.keys(filters);
        console.log('keys:', keys);
        let filterArray = keys.map((item) => {
            return {
                [item]: filters[item]
            }
        });
        return filterArray;
    }
    async setSqlArray(key, filters) {
        let brands = filters.filter(item => {
            if (Object.keys(item)[0].indexOf(key) > -1) {
                return true;
            }
            return false;
        })
        return brands;
    }
    async setSql(filter, filterArray) {
        let sql = ' (';
        for (let i = 0; i < filterArray.length; i++) {
            for (let key in filterArray[i]) {
                sql += `or ${filter}='${filterArray[i][key]}'`
            }
        }
        sql = sql.replace('or', '')+')';
        console.log('setSql:', sql);
        return sql;
    }
}