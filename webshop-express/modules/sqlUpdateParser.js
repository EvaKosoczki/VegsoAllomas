module.exports = async function (update) {
    let sql = `update ${update.table} set `;
        for(let key in update.set){
            sql+= `, ${key}='${update.set[key]}' `;
        }
        sql= sql.replace(', ','' );
        for(let key in update.where){
            sql +=`where ${key}= '${update.where[key]}'`;
        }
        
    return sql;
}