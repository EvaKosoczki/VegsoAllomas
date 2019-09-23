const DB = require('../modules/db');

const db = new DB();

module.exports = class BLSnowboards {
  constructor() {}


  //------------------------------------------------------------------------------------------
  /* Paraméterezős próbálkozás, ahol a lekérdezés minden adatát így adjuk meg */
  /*async readJoinedProducst() {
    const result = await db.readJoin('snowboards', 'brands', 'snowboards.brand', 'brands.id',
      ['snowboards.id',
        'snowboards.name',
        'brands.name',
        'snowboards.purpose',
        'snowboards.shape',
        'snowboards.size',
        'snowboards.address(postfix)',
        'snowboards.price',
        'snowboards.picture']);
    return result;
  } */
  //-----------------------------------------------------------------------------------------
  async readSnowboards(postfix = 0) {
    const result = await db.readJoin('snowboards', 'brands', 'brandId', 'id', postfix, ['brands.brandName', 'snowboards.name']);
    return result
  }

};