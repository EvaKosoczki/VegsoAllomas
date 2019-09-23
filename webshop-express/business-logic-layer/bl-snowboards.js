const DB = require('../modules/db');

const db = new DB();

module.exports = class BLSnowboards {
  constructor() {}

  async readSnowboards(postfix = 0) {
    const result = await db.readJoin('snowboards', 'brands', 'brandId', 'id', postfix, ['snowboards.name', 'snowboards.price', 'snowboards.picture', 'snowboards.id', 'snowboards.brandId', 'snowboards.purpose', 'snowboards.shape', 'snowboards.size', 'snowboards.postfix', ]);
    return result;
  }
};