const Queue = require("bull");
const { REDIS_URL } = process.env;
const { DEBUG_SERVER, EMAIL_SERVICE_PROVIDER } = require("../constant");
const debug = require("debug")(DEBUG_SERVER);
const SendGridService = require("./sendgrid.service");
const MailjetService = require("./mailjet.service");

const emailQueue = new Queue("email sending", REDIS_URL);
const EmailService = require("./email.service");

emailQueue.process(async (job) => {
  try {
    debug({ job });
    const data = job.data;

    debug({ data });
    const email = new EmailService(data);
    switch (data.emailServiceProvider) {
      case EMAIL_SERVICE_PROVIDER.SENDGRID:
        email.setEmailService({
          emailService: new SendGridService(),
          emailServiceProvider: EMAIL_SERVICE_PROVIDER.SENDGRID,
        });
        break;
      case EMAIL_SERVICE_PROVIDER.MAILJET:
        email.setEmailService({
          emailService: new MailjetService(),
          emailServiceProvider: EMAIL_SERVICE_PROVIDER.MAILJET,
        });
        break;
      default:
        email.setEmailService({
          emailService: new SendGridService(),
          emailServiceProvider: EMAIL_SERVICE_PROVIDER.SENDGRID,
        });
    }

    await email.sendEmail(data);
  } catch (error) {
    emailQueue.add({
      ...job.data,
      emailServiceProvider: EMAIL_SERVICE_PROVIDER.MAILJET,
    });
    debug({ error });
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
