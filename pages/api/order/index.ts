/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";

import { authMiddleware, validationMiddleware } from "middlewares";
import methods from "micro-method-router";
import { createOrder } from "controllers/order-controller";

const schemaReq = Yup.object().shape({
  productId: Yup.string().required(),
});

const schemaBody = Yup.object()
  .shape({
    items: Yup.array()
      .of(
        Yup.object({
          title: Yup.string(),
          description: Yup.string(),
          picture_url: Yup.string(),
          category_id: Yup.string(),
          quantity: Yup.number(),
          currency_id: Yup.string(),
          unit_price: Yup.number(),
        })
      )
      .required(),
    back_urls: Yup.object({
      success: Yup.string(),
      failure: Yup.string(),
    }).required(),
    notification_url: Yup.string().required(),
  })
  .noUnknown()
  .strict();

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

export default validationMiddleware(handler, schemaReq, schemaBody);
