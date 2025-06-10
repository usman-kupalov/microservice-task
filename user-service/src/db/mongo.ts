import * as mongoose from "mongoose";
import "@src/utils/env";
import * as process from "node:process";

export const initMongo = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    console.error("Failed to connect to mongo", error);
    await mongoose.disconnect();
  }
};
