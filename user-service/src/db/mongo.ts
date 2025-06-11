import * as mongoose from "mongoose";
import * as process from "node:process";
import Logger from "@src/utils/logging";

export const initMongo = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    Logger.error(`Failed to connect to mongo ${error}`);
    await mongoose.disconnect();
  }
};
