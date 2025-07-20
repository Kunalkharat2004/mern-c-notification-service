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
          from: message.from || config.get("mail.from"), 
          to: message.to,
          subject: message.subject || "No Subject",
          text: message.text || "No text content",
          html: message.html || "<b>No HTML content</b>",
        });

        console.log("Message sent:", info.messageId);
    }
}
