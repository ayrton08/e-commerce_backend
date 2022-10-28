import type { NextApiRequest, NextApiResponse } from "next";
import method from "micro-method-router";

import { authMiddleware } from "middlewares/middlewares";
import { Order } from "models/Order";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const orders = await Order.getOrdersByUserId(token.userId);

  res.status(200).json(orders);
}

const handler = method({
  get,
});

export default authMiddleware(handler);
