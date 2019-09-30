module.exports = async function (del) {
    let sql = ` delete from ${del.table} where `;
    for (key in del.where) {
        if (typeof del.where[key] === 'number') {
            sql += `${key}=${del.where[key]}`;
        } else if (key.indexOf("relation") > -1) {
            sql += ` ${del.where[key]} `
        } else {
            sql += `${key}='${del.where[key]}'`;
        }
    }
    console.log(sql)
    return sql;
}