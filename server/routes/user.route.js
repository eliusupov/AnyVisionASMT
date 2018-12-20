const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.post('/create', user_controller.user_create);
router.post('/login', user_controller.user_login);
router.get('/get/all', user_controller.user_get_all);
router.delete('/delete/:id', user_controller.user_delete_single);
router.post('/checkEmail', user_controller.user_check_email_avail);

module.exports = router;
