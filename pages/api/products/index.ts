import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimit } from "../../../helpers/requests";
import { products } from "../../../lib/algolia";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { limit, offset } = getOffsetAndLimit(req);
  const results = await products.search(req.query.search as string, {
    length: limit,
    offset: offset,
  });
  res.send({
    results: results.hits,
    paginatiun: {
      offset,
      limit,
      total: results.nbHits,
    },
  });
}
