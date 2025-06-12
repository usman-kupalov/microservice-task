import "tsconfig-paths/register";
import "@src/utils/env";
import * as process from "node:process";
import { normalizePort } from "@utils/port";
import * as http from "node:http";
import app from "@src/app";
import { channel, connection, startConsumer } from "@services/consumer";

const main = async () => {
  const port = normalizePort(process.env.PORT);

  app.set("port", port);
  let server = http.createServer(app);
  server.listen(port);

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.syscall != "listening") throw error;

    switch (error.code) {
      case "EACCES":
        console.error(`Port ${port} elevated privileges`);
        process.exit(1);
      case "EADDRINUSE":
        console.error(`Port ${port} is already in use`);
        process.exit(1);
      default:
        throw Error;
    }
  });

  server.on("listening", () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`Server listening on ${bind}`);
  });

  await startConsumer();
};

main().catch(async (error) => {
  console.error("Failed to run server", error);
  if (channel) await channel.close();
  if (connection) await connection.close();
  process.exit(1);
});
