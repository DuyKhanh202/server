const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const Field = require('../models/fieldModel.js');
const Booking = require('../models/bookingModel.js');
const Common = require('../config/common.js');

exports.insert = async (req, res) => {
  const { name, type, status, address, image, price } = req.body;

  try {
    const [existingUsers] = await Field.findByname(name);

    if (existingUsers.length > 0) {
      return Common.resdata(res, false, " already exists", "")
    }

    const newField = { name, type, status, address, image, price };
    await Field.create(newField);
    Common.resdata(res, true, "Place success", newField)
  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

exports.getinfo = async (req, res) => {
  const { id } = req.body;

  try {
    const [rows] = await Field.findByid(id);

    if (rows.length === 0) {
      return Common.resdata(res, false, "id not exist", "")
    }
    Common.resdata(res, true, "Search for success", rows[0])


  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};
exports.getlist = async (req, res) => {
  const { search, page } = req.body;

  try {
    const [rows] = await Field.findAll(search, page, jwtConfig.limit);

    if (rows.length === 0) {
      return Common.resdata(res, true, "Data not found", "")
    }
    Common.resdata(res, true, "Success", rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

exports.gettype = async (req, res) => {
  const { type } = req.body;

  try {
    const [rows] = await Field.findByType(type);

    if (rows.length === 0) {
      return Common.resdata(res, false, "Type not exist", "")
    }

    Common.resdata(res, true, "Search for success", rows)

  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};
exports.delete = async (req, res) => {
  const { name } = req.body;

  try {
    const [rows] = await Field.delete(name);
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
  const { name, type, status, address, image, price, id } = req.body;

  try {
    const [existingUsers] = await Field.findByid(id);

    if (existingUsers.length == 0) {
      return Common.resdata(res, false, "Id already not exists", "")
    }

    const newField = { name, type, status, address, image, price, id };
    await Field.update(newField);
    Common.resdata(res, true, "update success", newField)
  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};
// quan ly san
exports.getlistbook = async (req, res) => {
  const { id } = req.body;

  try {
    const [arrbooking] = await Booking.findBookfield(id);

    if (arrbooking.length === 0) {
      return Common.resdata(res, false, "id not exist", "")
    }
    Common.resdata(res, true, "Search for success", arrbooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

exports.getlistName = async (req, res) => {
  const { name } = req.body;

  try {
    const [arrbooking] = await Booking.findName(name);

    if (arrbooking.length === 0) {
      return Common.resdata(res, false, "id not exist", "")
    }
    Common.resdata(res, true, "Search for success", arrbooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

exports.getlistAll = async (req, res) => {
  const { search, page } = req.body;

  try {
    const [arrbooking] = await Booking.findAllbook(search, page, jwtConfig.limit);

    if (arrbooking.length === 0) {
      return Common.resdata(res, false, "Name not exist", "")
    }
    Common.resdata(res, true, "Search for success", arrbooking)
  } catch (error) {
    console.error(error);
    Common.resdata(res, false, "Internal Server Error", error)
  }
};

