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

class DB {
  constructor() {
    pool.getConnection().then((conn) => {
      this.conn = conn;
      // this.conn.query("SET SESSION time_zone = '+2:00'");
    });
  }

  async get(params) {
    let sql = await sqlParser(params)
    console.log(sql);
    let result = await this.conn.query(sql[0], sql[1]);
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
    return result;
  }
  async update(params) {
    let sql = await sqlUpdate(params);
    let result = await this.conn.query(sql);
    return result;
  }
  async getFilteredItems(sql, limit) {
    sql += `limit ${limit.start}, ${limit.limit}`;
    console.log(sql);
    let result = await this.conn.query(sql);
    return result;
  }
}
module.exports = new DB();