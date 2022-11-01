import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { getOffsetAndLimit } from "../../../helpers/requests";
import { validationMiddleware } from "../../../middlewares";
import { reqProductIndex } from "../../../schemas/product.validation";
import { findProductsWithPagination } from "../../../controllers/product.controller";

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const { limit, offset } = getOffsetAndLimit(req);
  const search = req.query.search as string;

  try {
    const results = await findProductsWithPagination(search, limit, offset);
    res.status(201).send({
      error: null,
      results: results.hits,
      pagination: {
        offset,
        limit,
        total: results.nbHits,
      },
    });
  } catch (error) {
    res.status(400).send({ error: { code: 400, message: error.message } });
  }
}

const handler = methods({
  get,
});

export default validationMiddleware(handler, reqProductIndex, null);
