/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import method from "micro-method-router";
import { Order } from "models/Order";
import { createPreference } from "lib/mercadopago";

const products = {
  "1234": {
    title: "mate",
    price: 100,
  },
};

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
  const { productId } = req.query as any;

  if (!products[productId]) {
    res.status(404).json({ message: "not found" });
  }

  const order = await Order.createNewOrder({
    aditionalInfo: req.body,
    productId,
    userId: token.userId,
    status: "pending",
    createdAt: new Date(),
  });

  const pref = await createPreference({
    ...req.body,
    external_reference: order.id,
  });

  res.send({
    url: pref.init_point,
  });
}

const handler = method({
  post: postHandler,
});

export default authMiddleware(handler);
