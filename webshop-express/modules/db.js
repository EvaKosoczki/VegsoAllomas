const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'webshop', user: 'root', password: 'root', connectionLimit: 5,
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
       b.name,
       s.purpose,
       s.shape,
       s.size,
       s.postfix,
       s.price,
       s.picture
      FROM snowboards s JOIN brands b ON s.brand = b.id        
      `;

    const result = await this.conn.query(sql);
    return result;
  }

  /* Returns one record with join based on the snowboards id */
  async readOne(postfix) {
    const sql = `
      SELECT s.id,
       s.name,
       b.name,
       s.purpose,
       s.shape,
       s.size,
       s.postfix,
       s.price,
       s.picture
      FROM snowboards s JOIN brands b ON s.brand = b.id 
      WHERE s.postfix = '${postfix}' 
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
  readOne() {}

  create() {}

  update() {}

  delete() {}
};
