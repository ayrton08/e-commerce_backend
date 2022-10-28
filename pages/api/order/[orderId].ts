import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { Order } from "models/Order";
import { validationMiddleware } from "middlewares";
import { reqOrderId } from "schemas/order.validation";

async function get(req: NextApiRequest, res: NextApiResponse) {
  const orderId = req.query.orderId as string;

  const myOrder = await Order.getOrderById(orderId);

  res.status(200).send({ error: false, myOrder });
}

const handler = methods({
  get,
});

export default validationMiddleware(handler, reqOrderId, null);
