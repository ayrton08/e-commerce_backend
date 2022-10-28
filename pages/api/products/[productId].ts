import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { products } from "lib/algolia";
import { validationMiddleware } from "middlewares";
import { reqProduct } from "schemas/product.validation";

async function get(req: NextApiRequest, res: NextApiResponse) {
  const productId = req.query.productId as string;

  try {
    const product = await products.getObject(productId);
    res.status(201).send({ error: false, product });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ error: true, message: error.message });
  }
}

const handler = methods({
  get,
});

export default validationMiddleware(handler, reqProduct, null);
