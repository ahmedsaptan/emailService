const Mailjet = require("node-mailjet");

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

class MailjetService {
    sendEmail({ to, from, subject, text, html }) {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "ahmed.sayed.fcis1997@gmail.com",
            Name: "Ahmad",
          },
          To: [
            {
              Email: "ahmed.sayed.fcis1997@gmail.com",
              Name: "Ahmad",
            },
          ],
          Subject: "Greetings from Mailjet.",
          TextPart: "My first Mailjet email",
          HTMLPart:
            "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          CustomID: "AppGettingStartedTest",
        },
      ],
    });
    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  }
}

module.exports = MailjetService;
