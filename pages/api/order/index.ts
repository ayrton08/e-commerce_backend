/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware, validationMiddleware } from "middlewares";
import methods from "micro-method-router";
import { createOrder } from "controllers/order.controller";
import { bodyOrder, reqOrder } from "schemas/order.validation";

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const productId = req.query.productId as string;

  try {
    const aditionalInfo = req.body;

    const { url, orderId } = await createOrder({
      productId,
      token,
      aditionalInfo,
    });

    res.status(201).send({
      error: null,
      url,
      orderId,
    });
  } catch (error) {
    res.status(400).send({ error: { code: 400, message: error.message } });
  }
}

const postAuth = authMiddleware(post);

const handler = methods({
  post: postAuth,
});

export default validationMiddleware(handler, reqOrder, bodyOrder);
