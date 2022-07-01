class EmailService {
  constructor({ to, from, subject, text, html }) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }

  setEmailService({ emailService, emailServiceProvider }) {
    this.emailService = emailService;
    this.emailServiceProvider = emailServiceProvider;
  }

  sendEmail() {
    this.emailService.sendEmail({
      to: this.to,
      from: this.from,
      subject: this.subject,
      html: this.html,
      text: this.text,
    });
  }
}

module.exports = EmailService;
