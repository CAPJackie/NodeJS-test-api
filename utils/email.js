// @ts-nocheck
import nodemailer from 'nodemailer';

export default class Email {
  constructor() {
    this.from = `Juan David Ramirez Mendoza <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_CLIENT,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendCampaignNotificationToContacts(contacts) {
    const info = await this.newTransport().sendMail({
      from: this.from,
      to: contacts,
      subject: 'Campaign important notification',
      text:
        'Hello! I just want you to know that a campaign you are added to, is now active'
    });
    console.log(info);
  }
}
