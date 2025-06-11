import amqp, { Channel, ChannelModel, Options } from "amqplib";
import * as process from "node:process";
import { EVENT_TYPES } from "@src/constants";
import Logger from "@src/utils/logging";

export let connection: ChannelModel | null = null;
export let channel: Channel | null = null;

export const getChannel = async (
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

export const consumeEvent = async () => {
  try {
    const channel = await getChannel();
    await channel.consume(process.env.QUEUE_NAME, (msg) => {
      if (msg) {
        const event = JSON.parse(msg.content.toString());
        handleEvent(event);
        channel.ack(msg);
      }
    });
  } catch (error) {
    Logger.error(`Failed to consume event: ${error}`);
  }
};

const handleEvent = (event: { type: string; data: any }) => {
  switch (event.type) {
    case EVENT_TYPES.USER_CREATED:
      Logger.log(`Welcome new user: ${event.data}`);
      break;
    case EVENT_TYPES.USER_DELETED:
      Logger.log(`User deleted: ID ${event.data}`);
      break;
    default:
      Logger.warn(`Unknown event type: ${event.type}`);
  }
};
