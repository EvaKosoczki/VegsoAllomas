const sqlMethods = require('./sqlGetMethods');
module.exports = async function (sqlQuery) {
  sqlMethods.deleteQuerys();
  let sql = '';
  let queryParams = [];
  for (let key in sqlMethods) { 
    if (sqlQuery[key]) {
      if (key === 'where') {
        let result = sqlMethods[key](sqlQuery[key], sql);
        sql += result[0];
        queryParams = result[1];
      } else {
        sql += sqlMethods[key](sqlQuery[key], sql);
      }
    }
  }
  return [sql, queryParams];
}