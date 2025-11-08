const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async sendEmail(to, subject, html) {
    try {
      const info = await this.transporter.sendMail({
        from: `"MoodMap" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
      });
      console.log('Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error.message);
      return false;
    }
  }

  async sendJournalReminder(userEmail, userName) {
    const html = `
      <h2>Hello ${userName}!</h2>
      <p>Don't forget to write your daily journal entry.</p>
      <p>Taking a few minutes to reflect on your day can help improve your emotional wellbeing.</p>
      <p><a href="${process.env.FRONTEND_URL}/journal">Write Journal Entry</a></p>
    `;
    return this.sendEmail(userEmail, 'Daily Journal Reminder', html);
  }

  async sendConsultationReminder(userEmail, userName, consultationDate, consultationTime) {
    const html = `
      <h2>Hello ${userName}!</h2>
      <p>You have an upcoming consultation scheduled for:</p>
      <p><strong>${consultationDate} at ${consultationTime}</strong></p>
      <p>Please make sure to join on time.</p>
      <p><a href="${process.env.FRONTEND_URL}/consultation">View Consultations</a></p>
    `;
    return this.sendEmail(userEmail, 'Consultation Reminder', html);
  }
}

module.exports = new EmailService();