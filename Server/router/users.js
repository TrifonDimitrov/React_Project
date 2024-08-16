const express = require('express');
const router = express.Router();
const {authController} = require('../controllers');
const {auth} = require('../utils');

router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), authController.editProfileInfo);
router.delete('/profile', auth(), authController.deleteProfile)




module.exports = router;