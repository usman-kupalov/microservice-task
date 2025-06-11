import amqp, { Channel, ChannelModel, Options } from "amqplib";
import "@src/utils/env";
import * as process from "node:process";
import Logger from "@src/utils/logging";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

const getChannel = async (
  opts: Options.AssertQueue = { durable: true },
): Promise<Channel> => {
  try {
    if (!connection) {
      connection = await amqp.connect(process.env.RABBITMQ_URL);
      Logger.info("RabbitMQ connection established");
      connection.on("error", (error) =>
        Logger.error(`RabbitMQ connection error: ${error}`),
      );
      connection.on("close", () => {
        Logger.warn("RabbitMQ connection closed");
        connection = null;
        channel = null;
      });
    }

    if (!channel) {
      channel = await connection.createChannel();
      await channel.assertQueue(process.env.QUEUE_NAME, opts);
      Logger.info("Channel & queue ready");
    }

    return channel;
  } catch (error) {
    Logger.error(`Failed to create channel ${error}`);
  }
};

const sendToQueue = (
  channel: amqp.Channel,
  queueName: string,
  event: { type: string; data: any },
) => {
  try {
    const isSent = channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(event)),
    );
    if (!isSent) {
      Logger.warn("Message not sent to queue (sendToQueue returned false)");
    } else {
      Logger.info(`Message sent to queue: ${queueName}`);
    }
  } catch (error) {
    Logger.error(`Failed to send queue ${error}`);
  }
};

export const publishEvent = async (event: { type: string; data: any }) => {
  try {
    const channel = await getChannel();
    sendToQueue(channel, process.env.QUEUE_NAME, event);
  } catch (error) {
    Logger.error(`Failed to publish event: ${error}`);
  }
};
