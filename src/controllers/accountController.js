const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/accountModel');
const jwtConfig = require('../config/jwtConfig');
const Account = require('../models/accountModel');
const Common = require('../config/common.js');

exports.register = async (req, res) => {
  const { name,type,email,phone_number,account_name,password } = req.body;

  try {
    const [existingUsers] = await Account.findByAccountname(account_name);

    if (existingUsers.length > 0) {
      return Common.resdata(res,false,"account_name already exists","")
    }

    const newUser = { name,type,email,phone_number,account_name,password };
    await Account.create(newUser);
    Common.resdata(res,true,"Register success",newUser)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.login = async (req, res) => {
  const { account_name, password } = req.body;

  try {
    const [rows] = await Account.findByAccountname(account_name);

    if (rows.length === 0) {
      return Common.resdata(res,false,"account or password incorrect","")
    }

    const acc = rows[0];

    //const passwordMatch = await bcrypt.compare(password, user.password);

    if (acc.password!=password) {
      return Common.resdata(res,false,"account or password incorrect","")
    }

    const token = jwt.sign({ account_name, role: acc.type }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    acc.token=token
    Common.resdata(res,true,"Login success",acc)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getinfo = async (req, res) => {
  const { account_name } = req.body;

  try {
    const [rows] = await Account.findByAccountname(account_name);

    if (rows.length === 0) {
      return Common.resdata(res,false,"account not exist","")
    }
    const acc = rows[0];
    Common.resdata(res,true,"Success",acc)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getinfoByID = async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await Account.findByAccountid(id);

    if (rows.length === 0) {
      return Common.resdata(res,false,"ID not exist","")
    }
    const acc = rows[0];
    Common.resdata(res,true,"Success",acc)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.getlist = async (req, res) => {
  const { search,page } = req.body;

  try {
    const [rows] = await Account.findAll(search,page,jwtConfig.limit);

    if (rows.length === 0) {
      return Common.resdata(res,true,"Data not found","")
    }
    Common.resdata(res,true,"Success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};

exports.deleteByname = async (req, res) => {
  const { name } = req.body;

  try {
    const [rows] = await Account.deleteByname(name);
    if (rows.affectedRows === 0) {
      return Common.resdata(res,true,"name not found","")
    }

    Common.resdata(res,true,"Delete success",rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};
exports.update = async (req, res) => {
  const { name,type,email,phone_number,password,account_name,id } = req.body;

  try {
    const [existingUsers] = await Account.findByAccountid(id);

    if (existingUsers.length == 0) {
      return Common.resdata(res,false,"account already not exists","")
    }

    const newUser = { name,type,email,phone_number,password,account_name,id };
    await Account.updateById(newUser);
    Common.resdata(res,true,"Update success",newUser)
  } catch (error) {
    console.error(error);
    Common.resdata(res,false,"Internal Server Error",error)
  }
};