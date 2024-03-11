const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const Booking = require('../models/bookingModel.js');
const Common = require('../config/common.js');

exports.insert = async (req, res) => {
  const { date_book, time_start, time_end, referee, total_price, field_id, account_id } = req.body;

  try {
    // const [existingUsers] = await Booking.findByA(account_id);
    // if (existingUsers.length > 0) {
    //   return Common.resdata(res,false," already exists","")
    // }

    const newBooking = { date_book, time_start, time_end, referee, total_price, account_id, field_id };
    await Booking.create(newBooking);
    // lấy ra được id từ bảng Booking
    const id = await Booking.findLastId();
    // console.log(id);
    Common.resdata(res, true, "Place success", newBooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

exports.getinfo = async (req, res) => {
  const { field_id } = req.body;

  try {
    const [rows] = await Booking.findByid(field_id);

    if (rows.length === 0) {
      return Common.resdata(res, false, "Field_id not exist", "")
    }
    const acc = rows;
    Common.resdata(res, true, "Search for success", acc)

  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

exports.getlist = async (req, res) => {
  const { search, page } = req.body;

  try {
    const [rows] = await Booking.findAll(search, page, jwtConfig.limit);

    if (rows.length === 0) {
      return Common.resdata(res, true, "Data not found", "")
    }
    Common.resdata(res, true, "Success", rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await Booking.delete(id);
    if (rows.affectedRows === 0) {
      return Common.resdata(res, true, " booking not found", "")
    }

    Common.resdata(res, true, "Success", rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

exports.update = async (req, res) => {
  const { date_book, time_start, time_end, referee, total_price, account_id, id } = req.body;

  try {
    const [existingUsers] = await Booking.findByid(id);

    if (existingUsers.length == 0) {
      return Common.resdata(res, false, "account already not exists", "")
    }
    const newBooking = { date_book, time_start, time_end, referee, total_price, account_id, id };
    await Booking.update(newBooking);
    Common.resdata(res, true, "Update success", newBooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};