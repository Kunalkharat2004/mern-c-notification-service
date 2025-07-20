import nodemailer,{ Transporter } from "nodemailer";
import config from "config";
import { Message, Notification } from "./types";

export class Mail implements Notification {
    transporter: Transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
          host: config.get("mail.host"),
          port: config.get("mail.port"),
          secure: false, // true for 465, false for other ports
          auth: {
            user: config.get("mail.user"), 
            pass: config.get("mail.pass"),
          },
        });
    }
    async send(message: Message) {
        const info = await this.transporter.sendMail({
          from: '"Kunal Kharat" <kunalkharat2004@gmail.com>',
          to: "bar@example.com, baz@example.com",
          subject: "Hello ✔ John Doe",
          text: "Thank you for your order",
          html: "<b>Thank you for your order</b>",
        });

        console.log("Message sent:", info.messageId);
    }
}
