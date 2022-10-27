import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { getOffsetAndLimit } from "../../../helpers/requests";
import { products } from "lib/algolia";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getOffsetAndLimit(req);
    const results = await products.search(req.query.search as string, {
      length: limit,
      offset: offset,
    });
    res.send({
      results: results.hits,
      pagination: {
        offset,
        limit,
        total: results.nbHits,
      },
    });
  },
});
