module.exports = {
  select(select) {
    let sql = 'select ';
    if (select == '*') {
      sql += '*';
    } else {
      for (let key in select) {
        sql += `, ${key} as '${select[key]}'`;
      }
      sql = sql.replace(',', '');
    }
    return sql;
    // console.log(sql);
  },
  from(table) {
    let sql = ` from ${table} `;
    return sql;
    //console.log(sql);
  },
  join(join) {
    let sql = '';
    for (let key in join) {
      if (key.indexOf('join') > -1) {
        sql += `${join[key]} join `;
      } else if (key.indexOf('table') > -1) {
        sql += `${join[key]} on `;
      } else {
        sql += `${key} = ${join[key]} `;
      }
    }
    return sql;
  },
  where(where) {
    let sql = "where ";
    for (let key in where) {
      if (typeof where[key] === "number") {
        sql += `${key}=${where[key]} `;
      } else if (key.indexOf("relation") > -1) {
        sql += `${where[key]} `
      } else {
        sql += `${key}="${where[key]}" `;
      }
    }
    return sql;
  },
  groupby(groupby) {
    let sql = ` group by ${groupby}`;
    return sql;
  },
  orderby(orderby) {
    let sql = ' order by';
    for (let key in orderby) {
      sql += `,  \`${key}\` ${orderby[key]}`;
    }
    sql = sql.replace(',', '');
    return sql;
  }
}