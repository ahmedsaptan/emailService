const express = require('express');
const router = express.Router();


router.use("/mails", require('./mail'))

module.exports = router;
