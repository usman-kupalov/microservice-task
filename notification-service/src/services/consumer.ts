import amqp from "amqplib";
import "@src/utils/env";
import * as process from "node:process";
import { EVENT_TYPES, QUEUE_NAME } from "@src/constants";
import Logger from "@src/utils/logging";

export const connectToRabbitMq = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    Logger.info("Connected to RabbitMQ");

    await channel.consume(QUEUE_NAME, (msg) => {
      if (msg) {
        const event = JSON.parse(msg.content.toString());
        handleEvent(event);
        channel.ack(msg);
      }
    });
  } catch (error) {
    Logger.error(`Failed to connect to RabbitMQ ${error}`);
  }
};

export const handleEvent = (event: { type: string; data: any }) => {
  switch (event.type) {
    case EVENT_TYPES.USER_CREATED:
      Logger.log(`Welcome new user: ${event.data.email}`);
      break;
    case EVENT_TYPES.USER_DELETED:
      Logger.log(`User deleted: ID ${event.data.id}`);
      break;
    default:
      Logger.warn(`Unknown event type: ${event.type}`);
  }
};
