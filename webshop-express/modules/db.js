const mariadb = require('mariadb');
const sqlParser = require('./sqlGetParser');
const sqlDel = require('../modules/sqlDeleteParser');
const sqlInsert = require('../modules/sqlInsertParser');
const sqlUpdate = require('../modules/sqlUpdateParser');
const pool = mariadb.createPool({
  user: 'root',
  password: 'root',
  database: 'webshop',
  connectionLimit: 6,
});

module.exports = class DB {
  constructor() {
    pool.getConnection().then((conn) => {
      this.conn = conn;
    });
  }

  async get(params) {
    let sql = await sqlParser(params)
    console.log(sql);
    let result = await this.conn.query(sql[0],sql[1]);
    //console.log(result);
    return result;
  }
  async del(params) {
    let sql = await sqlDel(params);
    console.log(sql);
    let result = await this.conn.query(sql);
    return result;
  }
  async create(params) {
    let sql = await sqlInsert(params);
    console.log(sql);
    let result = await this.conn.query(sql);
    return sql;
  }
  async update(params){
    let sql = await sqlUpdate(params);
    let result = await this.conn.query(sql);
    return result;
  }
  

}