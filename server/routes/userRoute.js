const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.post('/create', user_controller.userCreate);
router.post('/login', user_controller.userLogin);
router.get('/get/all', user_controller.userGetAll);
router.delete('/delete/:id', user_controller.userDeleteSingle);
router.post('/checkEmail', user_controller.userCheckEmailAvail);

module.exports = router;
