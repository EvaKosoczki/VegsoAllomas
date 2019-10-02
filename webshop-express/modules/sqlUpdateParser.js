module.exports = async function (update) {
  let sql = `update ${update.table} set `;
  for (const key in update.set) {
    sql += `, ${key}='${update.set[key]}' `;
  }
  sql = `${sql.replace(', ', '')}where `;
  for (const key in update.where) {

    if (key.indexOf('relation') > -1) {
      sql += `${update.where[key]} `;
    } else {
      sql += `${key}= '${update.where[key]}'`;
    }
  }


  return sql;
};
