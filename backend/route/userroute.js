const express = require('express');
const router = express.Router();
const userController = require('../controller/testController');
const upload = require('../middleware/multer')('image');
const authMiddleware = require('../middleware/authguard');

router.post('/createUsers', fileUpload('image'), userController.createUsers); // Single file for create
router.put('/updateUsers/:id', require('../middleware/multer')('image'), authMiddleware, userController.updateUsers);
router.get('/profile', authMiddleware, userController.getUserProfile);
router.get('/getAllUsers', authMiddleware, userController.getAllUsers);
router.get('/getUsers/:id', authMiddleware, userController.getUsers);
router.delete('/deleteUsers/:id', authMiddleware, userController.deleteUsers);

router.post('/test-upload', require('../middleware/multer')('image'), (req, res) => {
  console.log('Received body:', req.body);
  console.log('Received file:', req.file);
  res.json({ success: true, body: req.body, file: req.file });
});

router.post('/loginUser', userController.loginUser);

module.exports = router;