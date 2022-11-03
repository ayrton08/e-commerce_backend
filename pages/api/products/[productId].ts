import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { validationMiddleware } from "../../../middlewares";
import { reqProduct } from "../../../schemas/product.validation";
import { findProductById } from "../../../controllers/product.controller";

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const productId = req.query.productId as string;

  try {
    const product = await findProductById(productId);

    res.status(201).send({ error: null, product: { ...product } });
  } catch (error) {
    res.status(404).send({
      error: { code: 404, message: error.message },
    });
  }
}

const handler = methods({
  get,
});

export default validationMiddleware(handler, reqProduct, null);
