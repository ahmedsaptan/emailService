const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const debug = require("debug")("SendGridService");

class SendGridService  {
  constructor() {

  }
  async sendEmail(data) {
    try {
      const result = await sgMail.send(data);
      debug(result);
      debug({ statusCode: result[0].statusCode });
      debug({ headers: result[0].headers });
      debug({ messageId: result[0].headers["x-message-id"] });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SendGridService;
