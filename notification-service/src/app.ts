import Express from "express";
import cors from "cors";
import router from "@src/routes";

let app = Express();

app.use(Express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use("/", router);

export default app;
