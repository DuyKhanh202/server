const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/insert', bookingController.insert);

router.use(authMiddleware.authenticateToken);
router.post('/getinfo', authMiddleware.authenticateToken, bookingController.getinfo);
router.post('/getlist', authMiddleware.isAdmin, bookingController.getlist);
router.post('/delete', authMiddleware.isAdmin, bookingController.delete);
router.post('/update', authMiddleware.authenticateToken, bookingController.update);

module.exports = router;
