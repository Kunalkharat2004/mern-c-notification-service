export interface Message {
    to: string;
    from: string;
    subject?: string;
    text: string;
    html?: string;
}

export interface Notification {
    send(message: Message): Promise<void>;
}