const Queue = require("bull");
const { REDIS_HOST, REDIS_PORT } = process.env;
const { DEBUG_SERVER, EMAIL_SERVICE_PROVIDER } = require("../constant");
const debug = require("debug")(DEBUG_SERVER);
const SendGridService = require("./sendgrid.service");
const MailjetService = require("./mailjet.service");

const emailQueue = new Queue("email sending", `${REDIS_HOST}:${REDIS_PORT}`);
const EmailService = require("./email.service");

emailQueue.process(async (job) => {
  try {
    const data = job.data;

    debug({data})
    const email = new EmailService(data);
    if(data.emailServiceProvider === EMAIL_SERVICE_PROVIDER.SENDGRID) {
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
    debug("sending using: ", job.data.emailServiceProvider)
  } catch (error) {
    if(job.data.firstTime) {
      const data = {
        ...job.data,
        emailServiceProvider: EMAIL_SERVICE_PROVIDER.MAILJET,
        firstTime: false
      }
      emailQueue.add(data);
    }
  
    // TODO:
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
