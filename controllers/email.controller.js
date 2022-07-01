const Joi = require("joi");
const { DEBUG_SERVER } = require("../constant");
const debug = require("debug")(DEBUG_SERVER);
const messageQueueService = require('../services/messageQueue.service');
const createError = require("http-errors");

const validateSendingEmail = async (body) => {
  try {
    const schema = Joi.object({
      to: Joi.string().email().required(),
      from: Joi.string().email(),
      subject: Joi.string().min(10).required(),
      text: Joi.string().required(),
      html: Joi.string(),
    });
   return await schema.validateAsync(body);
  } catch (error) {
    throw createError.UnprocessableEntity(error.message);
  }

};

const sendEmail = async (req, res, next) => {
  try {
    const data = await validateSendingEmail(req.body);
    messageQueueService.emailQueue.add(data);
    res.send({ data });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  sendEmail,
};
