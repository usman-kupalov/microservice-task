import Express from "express";
import cors from "cors";

let app = Express();

app.use(Express.json());
app.use(
  cors({
    origin: "*",
  }),
);

export default app;
