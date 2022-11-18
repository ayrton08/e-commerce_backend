import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { Order } from "models/Order";
import { validationMiddleware } from "middlewares";
import { reqOrderId } from "schemas/order-validation";

async function get(req: NextApiRequest, res: NextApiResponse) {
  const orderId = req.query.orderId as string;

  try {
    const myOrder = await Order.getOrderById(orderId);
    res.status(200).send({ error: null, order: { ...myOrder } });
  } catch (error) {
    res.status(400).send({ error: { code: 400, message: error.message } });
  }
}

const handler = methods({
  get,
});

export default validationMiddleware(handler, reqOrderId, null);
