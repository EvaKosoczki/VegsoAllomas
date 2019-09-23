const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'webshop',
  user: 'root',
  password: 'root',
  connectionLimit: 5,
});



module.exports = class DB {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }

  async readJoin(table1, table2, column1, column2, postfix, ...args) {
    let sql = '';
    if (postfix == 0) {
      sql = `
      SELECT ${args}
      FROM ${table1} JOIN ${table2} ON ${table1}.${column1} = ${table2}.${column2}
      LIMIT 12
      `;
    } else {
      sql = `
      SELECT ${args}
      FROM ${table1} JOIN ${table2} ON ${table1}.${column1} = ${table2}.${column2}
      WHERE postfix= '${postfix}'
      `;
    }


    const result = await this.conn.query(sql);
    return result;
  }


  create() {}

  update() {}

  delete() {}
};