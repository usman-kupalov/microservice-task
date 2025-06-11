import Logger from "js-logger";

Logger.useDefaults();
Logger.setHandler((messages, context) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${context.level.name}] ${JSON.stringify(messages)}`;
  console.log(logMessage);
});

export default Logger;
