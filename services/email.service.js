class EmailService {
  constructor({ to, from, subject, text, html }) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
    this.html = html;
    this.defaultFromEmail = process.env.SENDING_EMAIL;
    if (this.defaultFromEmail) {
      this.from = this.defaultFromEmail;
    }
  }

  setEmailService({ emailService, emailServiceProvider }) {
    this.emailService = emailService;
    this.emailServiceProvider = emailServiceProvider;
  }

  sendEmail() {
    return this.emailService.sendEmail({
      to: this.to,
      from: this.from,
      subject: this.subject,
      text: this.text,
      html: this.html,
    });
  }
}

module.exports = EmailService;
