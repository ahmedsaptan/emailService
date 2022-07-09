const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

router.post('/', emailController.sendEmail);
router.get('/', emailController.getEmails);
module.exports = router;
