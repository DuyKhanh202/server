const express = require('express');
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/register', accountController.register);
router.post('/login', accountController.login);

router.use(authMiddleware.authenticateToken);
router.post('/getinfo', authMiddleware.authenticateToken, accountController.getinfo);
router.post('/getinfoByID', authMiddleware.authenticateToken, accountController.getinfoByID);
router.post('/getlist', authMiddleware.isAdmin, accountController.getlist);
router.post('/deleteByname', authMiddleware.isAdmin, accountController.deleteByname);
router.post('/update', authMiddleware.authenticateToken, accountController.update);

module.exports = router;
