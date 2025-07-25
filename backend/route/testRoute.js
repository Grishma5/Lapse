const router = require('express').Router();
const { createUsers, updateUsers, deleteUsers, getAllUsers, getUsers, loginUser, getUserProfile, updateUserProfile } = require('../controller/testController');
const fileUpload = require('../middleware/multer');
const authGuard = require('../middleware/authguard');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/multer')('image');

router.post('/createUsers', fileUpload('image'), createUsers);
router.post('/loginUser', loginUser);
router.put('/updateUsers/:id', require('../middleware/multer')('image'), authGuard, updateUsers);
router.delete('/deleteUsers/:id', authGuard, deleteUsers);
router.get('/getAllUsers', authGuard, isAdmin, getAllUsers);
router.get('/getUsers/:id', authGuard, getUsers);
router.get('/users/profile', authGuard, getUserProfile); // Added profile GET endpoint
router.put('/users/profile', authGuard, updateUserProfile); // Added profile PUT endpoint
router.post('/test-upload', require('../middleware/multer')('image'), (req, res) => {
  console.log('Received body:', req.body);
  console.log('Received file:', req.file);
  res.json({ success: true, body: req.body, file: req.file });
});
module.exports = router;