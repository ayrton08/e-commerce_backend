import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { Order } from "models/Order";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const orderId = req.query.orderId as string;

    const myOrder = await Order.getOrderById(orderId);

    res.send(myOrder);
  },
});
