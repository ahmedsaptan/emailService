const sgMail = require("@sendgrid/mail");
const debug
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  } catch (error) {
    console.error({error})
  }

};

module.exports = send;
