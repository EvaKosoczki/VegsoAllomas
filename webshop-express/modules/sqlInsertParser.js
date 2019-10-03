module.exports = async function (insert) {
    let sql = `insert into ${insert.table}`;
    let keys = Object.keys(insert.values);
    let sqlKeys = ' (';
    let sqlValues = ' values (';
    for (let i = 0; i < keys.length; i++) {
        sqlKeys += `, ${keys[i]}`;
    }

    sql += sqlKeys.replace(', ', '') + ')';

    for (let key in insert.values) {
        if (typeof insert.values[key] === 'number' || insert.values[key].indexOf("SHA1") > -1) {
            sqlValues += `, ${insert.values[key]}`;
        } else {
            sqlValues += `, '${insert.values[key]}'`;
        }
    }
    sql += sqlValues.replace(', ', '') + ')';
    //console.log(sql);
    return sql;
}