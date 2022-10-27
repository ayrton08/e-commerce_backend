/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import method from "micro-method-router";
import { Order } from "models/Order";
import { createPreference } from "lib/mercadopago";
import { products } from "lib/algolia";

async function post(req: NextApiRequest, res: NextApiResponse, token) {
  const { productId } = req.query as any;

  const product = await products.getObject(productId);

  if (!product) {
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
  post,
});

export default authMiddleware(handler);
