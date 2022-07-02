const Queue = require("bull");
const { REDIS_HOST, REDIS_PORT } = process.env;
const { DEBUG_SERVER, EMAIL_SERVICE_PROVIDER } = require("../constant");
const debug = require("debug")(DEBUG_SERVER);
const SendGridService = require("./sendgrid.service");
const MailjetService = require("./mailjet.service");

const emailQueue = new Queue("email sending", `redis://localhost:6379`);
const EmailService = require("./email.service");
const { Email: EmailModel } = require("../data/models");

emailQueue.process(async (job) => {
  const data = job.data;
  debug({ data });
  const emailObj = data.email;
  try {
    const email = new EmailService(data);
    if (data.emailServiceProvider === EMAIL_SERVICE_PROVIDER.SENDGRID) {
      const sgService = new SendGridService();
      email.setEmailService({
        emailService: sgService,
        emailServiceProvider: EMAIL_SERVICE_PROVIDER.SENDGRID,
      });
    } else {
      const mjService = new MailjetService();
      email.setEmailService({
        emailService: mjService,
        emailServiceProvider: EMAIL_SERVICE_PROVIDER.MAILJET,
      });
    }

    await email.sendEmail();
    if (emailObj.provider === data.emailServiceProvider) {
      await EmailModel.query().findById(emailObj.id).patch({
        send: true,
      });
    } else {
      await EmailModel.query().findById(emailObj.id).patch({
        send: true,
        provider: data.emailServiceProvider
      });
    }
   
  } catch (error) {
    if (data.firstTime) {
      emailQueue.add({
        ...job.data,
        emailServiceProvider: EMAIL_SERVICE_PROVIDER.MAILJET,
        firstTime: false,
      });
    }
  }
});

emailQueue.on("completed", (job) => {
  debug(`Job with id ${job.id} has been completed`);
});

emailQueue.on("global:completed", (jobId) => {
  debug(`Job with id ${jobId} has been completed`);
});

module.exports = {
  emailQueue,
};
