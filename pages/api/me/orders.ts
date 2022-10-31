import type { NextApiRequest, NextApiResponse } from "next";
import method from "micro-method-router";

import { authMiddleware } from "middlewares";
import { Order } from "models/Order";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  try {
    const orders = await Order.getOrdersByUserId(token.userId);
    res.status(200).json({ error: null, orders });
  } catch (error) {
    res.status(400).json({ error: { code: 400, message: error.message } });
  }
}

const handler = method({
  get,
});

export default authMiddleware(handler);
