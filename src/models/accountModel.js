const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');


const Account = {
  create: async (account) => {
    return pool.execute('INSERT INTO account (name,type,email,phone_number,account_name,password) VALUES (?,?,?,?,?,?)', [account.name,account.type,account.email,account.phone_number,account.account_name,account.password]);
  },
  findByAccountname: (account_name) => pool.execute('SELECT * FROM account WHERE account_name = ?', [account_name]),
  findByAccountid: (id) => pool.execute('SELECT * FROM account WHERE id = ?', [id]),
  findAll: async (search,page,limit) => {
    where=""
    if (search!=""){
      where = " AND account_name like '%"+search+"%'"
    }
    offset = page*limit-limit
    sql= "SELECT * FROM account WHERE 1=1 "+where+" limit "+offset+","+limit;
    return pool.execute(sql);
  },
  deleteByname:(name) => pool.execute('DELETE FROM account WHERE name = ?', [name]),
  updateById: (account) =>pool.execute('UPDATE account SET name=?,type=?,email=?,phone_number=?,account_name=?,password=? WHERE id = ?', [account.name,account.type,account.email,account.phone_number,account.account_name,account.password,account.id]),

};

module.exports = Account;