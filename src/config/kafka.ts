import { Consumer, EachMessagePayload, Kafka } from "kafkajs";
import config from "config";
import { MessageBroker } from "../types/broker";
import { createNotification } from "../factories/notification-factory";
import { OrderEvents, PaymentMode, PaymentStatus } from "../types";
import { MailHtml, MailText } from "../utils";

export class KafkaBroker implements MessageBroker {
  private consumer: Consumer;

  constructor(clientId: string, brokers: string[]) {
    const kafka = new Kafka({ clientId, brokers });

    this.consumer = kafka.consumer({ groupId: clientId });
  }

  /**
   * Connect the consumer
   */
  async connectConsumer() {
    await this.consumer.connect();
  }

  /**
   * Disconnect the consumer
   */
  async disconnectConsumer() {
    await this.consumer.disconnect();
  }

  async consumeMessage(topics: string[], fromBeginning: boolean = false) {
    await this.consumer.subscribe({ topics, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        // Logic to handle incoming messages.
        console.log({
          value: message.value.toString(),
          topic,
          partition,
        });

        if (topic === "order") {
          const order = JSON.parse(message.value.toString());

          if (
            // Case 1: COD orders - add immediately when created
            (order.event_type === OrderEvents.ORDER_CREATED &&
              order.data.paymentMode === PaymentMode.CASH) ||
            // Case 2: Card orders - only add when payment is completed
            (order.event_type === OrderEvents.ORDER_CREATED &&
              order.data.paymentMode === PaymentMode.CARD &&
              order.data.paymentStatus === PaymentStatus.PAID) ||
            // Case 3: Payment status updates for card orders - add when payment becomes paid
            (order.event_type === OrderEvents.PAYMENT_STATUS_UPDATE &&
              order.data.paymentMode === PaymentMode.CARD &&
              order.data.paymentStatus === PaymentStatus.PAID)
          ) {
            const transport = createNotification("mail");

            await transport.send({
              from: config.get("mail.from"),
              to: order.data.customerId.email,
              subject: "Your Pizza Order Confirmation 🍕",
              text: MailText(order),
              html: MailHtml(order),
            });
          }
        }
      },
    });
  }
}
