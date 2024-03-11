const express = require('express');
const fieldController = require('../controllers/fieldController');
const authMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post('/insert', fieldController.insert);

router.use(authMiddleware.authenticateToken);
router.post('/getinfo', authMiddleware.authenticateToken, fieldController.getinfo);
router.post('/gettype', authMiddleware.authenticateToken, fieldController.gettype);
router.post('/getlist', authMiddleware.isAdmin, fieldController.getlist);
router.post('/delete', authMiddleware.isAdmin, fieldController.delete);
router.post('/update', authMiddleware.authenticateToken, fieldController.update);


// lay lich dat san bong
router.post('/getlistbook', authMiddleware.authenticateToken, fieldController.getlistbook);
router.post('/getlistName', authMiddleware.authenticateToken, fieldController.getlistName);
router.post('/getlistAll', authMiddleware.authenticateToken, fieldController.getlistAll);
module.exports = router;
