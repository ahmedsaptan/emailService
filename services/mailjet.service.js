const Mailjet = require("node-mailjet");
const debug = require('debug')("mailjet.service");
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

class MailjetService{
    constructor() {
    }
    sendEmail(data) {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: data.from,
            Name: data.from.split("@")[0],
          },
          To: [
            {
              Email: data.to,
              Name: data.to.split("@")[0],
            },
          ],
          Subject: data.subject,
          TextPart: data.text,
          HTMLPart: data.html,
          CustomID: "AppGettingStartedTest",
        },
      ],
    });
    return request
      .then((result) => {
        debug(result.body);
      })
      .catch((err) => {
        debug(err.statusCode);
      });
  }
}

module.exports = MailjetService;
