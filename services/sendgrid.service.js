const { DEBUG_SERVER } = require("../constant")
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const debug = require("debug")(DEBUG_SERVER);

const send = async ({ to, from, subject, text, html }) => {
  try {
    const msg = {
      to,
      from,
      subject,
      text,
      html,
    };
    const result = await sgMail.send(msg);
    debug({statusCode: result[0].statusCode})
    debug({headers: result[0].headers})
  } catch (error) {
    debug({error})
  }

};

module.exports = send;
