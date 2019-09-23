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

  /* Returns the whole database with join */
  async read() {
    const sql = `
      SELECT s.id,
       s.name,
       b.brandName,
       s.purpose,
       s.shape,
       s.size,
       s.postfix,
       s.price,
       s.picture
      FROM snowboards s JOIN brands b ON s.brandId = b.id        
      `;

    const result = await this.conn.query(sql);
    return result;
  }

  /* Should return one record with join based on the snowboards postfix */
  async readOne(postfix) {
    const sql = `
      SELECT s.id,
       s.name,
       b.brandName,
       s.purpose,
       s.shape,
       s.size,
       s.postfix,
       s.price,
       s.picture
      FROM snowboards s JOIN brands b ON s.brandId = b.id 
      WHERE s.id = '${postfix}'
      `;
    const result = await this.conn.query(sql);
    return result;
  }

  //---------------------------------------------------------------------------------------------
  /* Paraméterezős próbálkozás, a függvény átalakítja a business-logic-layer/bl.snowboards.js-ben
  tömbben megadott sorokat stringgé.
   Ezt kéne átadni a readJoin SELECT-jébe, de itt valami promise-os gond van. */
  /* async getRows(rowArray) {
    let rows = '';
    for (i = 0; i < rowArray.length; i++) {
      rows += `${rowArray[i]}, `;
    }
    await rows;
    return rows;
  } */

  /* A this.getRows(rows) {Object Promise} -t ad vissza, ezért nem fut le */
  /* async readJoin(table, joinTable, joinRow1, joinRow2, rows) {
    const queryRows = this.getRows(rows);
    const sql = `
         SELECT ${queryRows}
         FROM ${table} JOIN ${joinTable} ON ${joinRow1} = ${joinRow2}
         `;

    const result = await this.conn.query(sql);
    return result;
  } */
  //--------------------------------------------------------------------------------------------
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


  create() { }

  update() { }

  delete() { }
};
