import { Mail } from "../mail";
import { Notification } from "../types";

export const createNotification = (type: "mail" | "sms"): Notification => {
    const transporter: Notification[] = [];
    switch (type) {
        case "mail": {
            const transport = transporter.find(t => t instanceof Mail);
            if (transport) {
                return transport;
            }
            // If not found, create a new Mail instance
            const instance = new Mail();
            transporter.push(instance);
            return instance;
        }
        case "sms": {
            throw new Error("SMS notification is not implemented yet");
        }
        default: {
            throw new Error(`Unsupported notification type: ${type}`);
        }
    }
}