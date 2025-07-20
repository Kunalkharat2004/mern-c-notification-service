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
export enum PaymentMode {
  CASH = "cod",
  CARD = "card",
}

export enum OrderStatus {
  RECEIVED = "received",
  CONFIRMED = "confirmed",
  PREPARED = "prepared",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export enum OrderEvents {
  ORDER_CREATED = "ORDER_CREATED",
  ORDER_UPDATED = "ORDER_UPDATED",
  PAYMENT_STATUS_UPDATE = "PAYMENT_STATUS_UPDATE",
}
