const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');


const Field = {
  create: async (field) => {
    return pool.execute('INSERT INTO field ( name,type,status,address,image,price) VALUES (?,?,?,?,?,?)', [field.name, field.type, field.status, field.address, field.image, field.price]);
  },
  findByname: (name) => pool.execute('SELECT * FROM field WHERE name = ?', [name]),
  findByid: (id) => pool.execute('SELECT * FROM field WHERE id = ?', [id]),
  findByType: (type) => pool.execute('SELECT * FROM field WHERE type = ?', [type]),
  findAll: async (search, page, limit) => {
    where = ""

    if (search != "") {
      where = " AND name like '%" + search + "%'"
    }
    offset = page * limit - limit
    sql = "SELECT * FROM field WHERE 1=1 " + where + " limit " + offset + "," + limit;
    return pool.execute(sql);
  },
  delete: (name) => pool.execute('DELETE FROM field WHERE name = ?', [name]),
  update: (field) => pool.execute('UPDATE field SET name=?,type=?,status=?,address=?,image=?,price=? WHERE id = ?', [field.name, field.type, field.status, field.address, field.image, field.price, field.id]),


};

module.exports = Field;