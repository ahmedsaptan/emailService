const { DEBUG_SERVER } = require("../constant");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromEmail = process.env.SENDING_EMAIL;
const debug = require("debug")(DEBUG_SERVER);

class SendGridService {
  async sendEmail({ to, from, subject, text, html }) {
    throw new Error("test")
    try {
      const msg = {
        to,
        from: from ? from : fromEmail,
        subject,
        text,
        html,
      };

      debug({ msg });
      const result = await sgMail.send(msg);
      debug(result);
      debug({ statusCode: result[0].statusCode });
      debug({ headers: result[0].headers });
      debug({ messageId: result[0].headers["x-message-id"] });
      return result;
    } catch (error) {
      debug({ error });
    }
  }
}

module.exports = SendGridService;
