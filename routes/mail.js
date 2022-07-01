const express = require('express');
const router = express.Router();
const sendMail = require("./../services/sendgrid.service")

router.post('/', (req, res) => {
  sendMail("ahmed.sayed.fcis1997@gmail.com")
  res.send({
    message: "Okay"
  })
});

module.exports = router;
