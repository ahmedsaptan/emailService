const express = require('express');
const router = express.Router();
const sendMail = require("./../services/sendgrid.service")

router.post('/', async (req, res) => {
  try {
    const rr = await sendMail({
      to: "ahmed.sayed.fcis1997@gmail.com",
      from: "ahmed.sayed.fcis1997@gmail.com",
      subject: "test",
      text: "hi"
    })
    res.send({
      message: "Okay"
    })
  } catch (error) {
    
  }

});

module.exports = router;
