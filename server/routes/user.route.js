const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/create', user_controller.user_create);
router.get('/get/all', user_controller.user_get_all);
router.delete('/delete/:id', user_controller.user_delete_single);

module.exports = router;
