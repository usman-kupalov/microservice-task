import { catchAsync } from "@middleware/errorHandler";
import { Request, Response } from "express";
import { getChannel } from "@services/publisher";

export const healthCheck = catchAsync(async (req: Request, res: Response) => {
  try {
    const channel = await getChannel();
    await channel.checkQueue(process.env.QUEUE_NAME);
    res.json({ status: true });
  } catch (error) {
    res.status(503).json({ status: false });
  }
});
