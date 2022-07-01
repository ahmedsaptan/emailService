const Joi = require("joi");
const { DEBUG_SERVER } = require("../constant");
const debug = require("debug")(DEBUG_SERVER);
const messageQueueService = require('../services/messageQueue.service');

const validateSendingEmail = (body) => {
  const schema = Joi.object({
    to: Joi.string().email(),
    from: Joi.string().email(),
    subject: Joi.string().min(10),
    text: Joi.string(),
    html: Joi.string(),
  });
  return schema.validateAsync(body);
};

const sendEmail = async (req, res, next) => {
  try {
    const data = await validateSendingEmail(req.body);
    debug({
        data,
    });

    messageQueueService.emailQueue.add(data);
    res.send({ data });
  } catch (error) {
    debug({ error });
  }
};

module.exports = {
  sendEmail,
};
