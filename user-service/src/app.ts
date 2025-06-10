import Express, { ErrorRequestHandler } from "express";
import cors from "cors";
import router from "@src/routes";
import { errorHandler } from "@middleware/errorHandler";

let app = Express();

app.use(Express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use("/", router);
app.use(errorHandler as ErrorRequestHandler);

export default app;
