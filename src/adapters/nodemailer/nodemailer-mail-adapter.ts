import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6cb45fece6885f",
    pass: "235e5f28d330a5"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <hello@feedget.com>',
      to: "Rodolfo <rdtec.info@gmail.com",
      subject,
      html: body
    });
  }
}