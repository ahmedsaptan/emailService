const Joi = require("joi");
const { DEBUG_SERVER, EMAIL_SERVICE_PROVIDER } = require("../constant");
const debug = require("debug")(DEBUG_SERVER);
const messageQueueService = require('../services/messageQueue.service');
const createError = require("http-errors");
const { Email } = require("../data/models");

const validateSendingEmail = async (body) => {
  try {
    const schema = Joi.object({
      to: Joi.string().email().required(),
      from: Joi.string().email(),
      subject: Joi.string().required(),
      text: Joi.string(),
      html: Joi.string(),
    }).or('text', 'html')
   return await schema.validateAsync(body);
  } catch (error) {
    throw createError.UnprocessableEntity(error.message);
  }

};

const sendEmail = async (req, res, next) => {
  try {
    const data = await validateSendingEmail(req.body);
    const email = await Email.query().insert({
      to: "kjh",
      from :"aldhaf",
      text: "ksjghf",
      subject: "jhfg",
      html: "jhgkhjf",
      provider: "sjahdgf"
    })

    debug({
      email
    })
    messageQueueService.emailQueue.add({...data, emailServiceProvider: EMAIL_SERVICE_PROVIDER.SENDGRID, firstTime: true });
    res.send({ data });
  } catch (error) {
    debug({error})
    next(error)
  }
};

module.exports = {
  sendEmail,
};
