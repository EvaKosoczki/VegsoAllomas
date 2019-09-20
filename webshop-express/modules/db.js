const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'webshop', user: 'root', password: 'root', connectionLimit: 5,
});

module.exports = class DB {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }
};
