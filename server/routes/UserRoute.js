const express = require('express');
const router = express.Router();

const User = require('../controllers/User');

router.post('/create', User.userCreate);
router.post('/login', User.userLogin);
router.get('/get/all', User.userGetAll);
router.delete('/delete/:id', User.userDeleteSingle);
router.post('/checkEmail', User.userCheckEmailAvail);

module.exports = router;
