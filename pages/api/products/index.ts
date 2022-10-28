import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { getOffsetAndLimit } from "helpers/requests";
import { products } from "lib/algolia";
import { validationMiddleware } from "middlewares";
import { reqProductIndex } from "schemas/product.validation";

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { limit, offset } = getOffsetAndLimit(req);
  const search = req.query.search as string;

  const results = await products.search(search, {
    length: limit,
    offset: offset,
  });
  res.status(201).send({
    error: false,
    results: results.hits,
    pagination: {
      offset,
      limit,
      total: results.nbHits,
    },
  });
}

const handler = methods({
  get,
});

export default validationMiddleware(handler, reqProductIndex, null);
