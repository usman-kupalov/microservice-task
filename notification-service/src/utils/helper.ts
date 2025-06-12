import Logger from "@src/utils/logging";

export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries = 5,
  delay: number = 5000,
  label = "operation",
): Promise<T> => {
  while (retries > 0) {
    try {
      return await fn();
    } catch (error) {
      Logger.error(`${label} failed, retrying...`);
      retries--;
      if (retries < 0) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }

  throw new Error(`Failed to complete ${label} after multiple attempts`);
};
