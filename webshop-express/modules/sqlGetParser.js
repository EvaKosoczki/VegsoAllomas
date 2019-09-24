const sqlMethods = require('./sqlGetMethods');
module.exports =async function (sqlQuery) {
  let sql ='';
  for (let key in sqlMethods) {
    if (sqlQuery[key]) {
     sql += sqlMethods[key](sqlQuery[key], sql);
    }
  }
  return sql;
}