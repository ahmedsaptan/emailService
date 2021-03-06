const { DEBUG_SERVER } = require("../constant");
const debug = require("debug")(DEBUG_SERVER);
const vars = ["SENDGRID_API_KEY", "SENDING_EMAIL"];


const checkEnvVars = () => {
  vars.forEach((word) => {
    if (process.env[word]) {
      debug(`this var: ${word} =>  set`);
    } else {
      debug(`this var: ${word} => not set ****** please add it`);
      process.exit(1);
    }
  });
};

module.exports = { checkEnvVars };
