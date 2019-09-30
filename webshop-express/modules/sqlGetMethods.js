module.exports = {
  queryParams: [],
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
  },
  from(table) {
    let sql = ` from ${table} `;
    return sql;
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
      if (where[key].indexOf('SHA1') > -1) {
        sql += `${key}=${where[key]}`;
      } else if (key.indexOf("relation") > -1) {
        sql += `${where[key]} `
      } else {
        sql += `${key}=? `;
        this.queryParams.push(where[key]);
      }
    }
    return [sql, this.queryParams];
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
  },
  limit(limit) {
    let sql = ' limit ';
    for (let key in limit) {
      sql += `${key}, ${limit[key]}`
    }
    return sql;
  },
  deleteQuerys() {
    this.queryParams = [];
  }
}