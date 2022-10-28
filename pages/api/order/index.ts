/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import method from "micro-method-router";
import { createOrder } from "controllers/order.controller";

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const { productId } = req.query as any;

  try {
    const aditionalInfo = req.body;

    const { url, orderId } = await createOrder({
      productId,
      token,
      aditionalInfo,
    });

    res.status(201).send({
      url,
      orderId,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

const handler = method({
  post,
});

export default authMiddleware(handler);
