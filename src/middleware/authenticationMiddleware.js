const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const Common = require('../config/common.js');

exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return Common.resdata(res,false,"Unauthorized","")
  }

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return Common.resdata(res,false,"Invalid token","")
    }

    req.user = decoded;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    Common.resdata(res,false,"Forbidden - Admins only","")
  }
};
