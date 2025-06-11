import { Request, Response, Router } from "express";
import { getChannel } from "@services/consumer";

let router = Router();

router.get("/health", async function (req: Request, res: Response) {
  try {
    const channel = await getChannel();
    await channel.checkQueue(process.env.QUEUE_NAME);
    res.json({ status: true });
  } catch (error) {
    res.status(503).json({ status: false });
  }
});

export default router;
