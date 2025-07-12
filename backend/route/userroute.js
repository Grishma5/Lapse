const router = require('express').Router();
const userController = require('../controller/testController');

router.post('/register', userController.createUsers);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);

module.exports = router;