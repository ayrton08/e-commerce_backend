import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { products } from "lib/algolia";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const productId = req.query.productId as string;

    try {
      const product = await products.getObject(productId);
      res.status(201).send(product);
    } catch (error) {
      res.status(404).send("Product not found");
    }
  },
});
