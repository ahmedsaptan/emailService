const { program } = require('commander');

program
    .description('send email from email address to anther email address')
  .option('-t, --to <type>', 'email address for the user that you want to send')
  .option('-f, --from <type>', 'email address for you sender email address')
  .option('-tx, --text <type>', 'text that you want inside email')
  .option('-s, --subject <type>', 'subject of email')
  .option('-ht, --html <type>', 'html template of email');

program.parse();

const options = program.opts();

console.log({
    options
})
