const DB = require('../modules/db');

const db = new DB();

module.exports = class BLSnowboards {
  constructor() { }


  //------------------------------------------------------------------------------------------
  /* Paraméterezős próbálkozás, ahol a lekérdezés minden adatát így adjuk meg */
  /* async readJoinedProducst() {
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
    const result = await db.readJoin('snowboards', 'brands', 'brandId', 'id', postfix,
      ['brands.brandName', 'brands.logo', 'snowboards.price', 'snowboards.name',
        'snowboards.purpose', 'snowboards.size', 'snowboards.shape', 'snowboards.picture', 'snowboards.postfix',
      ]);
    return result;
  }

  async readUsers(table2 = 0, column1 = 0, column2 = 0, postfix = 0) {
    const result = await db.readJoin('users', table2, column1, column2, postfix,
      ['users.firstName', 'users.lastName', 'users.email', 'users.password', 'users.address',
        'users.zip', 'users.city', 'users.cookie',
      ]);
    return result;
  }
};
