const Queue = require('bull');
const { REDIS_URL } = process.env;
const {DEBUG_SERVER} = require('../constant')
const debug = require('debug')(DEBUG_SERVER);
const sendEmail = require('./sendgrid.service')
const emailQueue = new Queue('email sending', REDIS_URL);

emailQueue.process(async (job) => {

    try {
        debug({job})
        const data = job.data;
        const result = await sendEmail(data);
        debug({result})
    } catch (error) {
        debug({error})
    }
 
  });

  emailQueue.on('completed', job => {
    debug(`Job with id ${job.id} has been completed`);
  })  

  emailQueue.on('global:completed', jobId => {
    debug(`Job with id ${jobId} has been completed`);
  })
  

  module.exports =  {
    emailQueue
  }