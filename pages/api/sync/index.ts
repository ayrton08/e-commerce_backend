import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimit } from "helpers/requests";
import { syncAlgoliaWithAirtable } from "controllers/product-controller";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { limit } = getOffsetAndLimit(req, 100, 1000);

  try {
    await syncAlgoliaWithAirtable(limit, res);
  } catch (error) {
    res.status(400).send({ error: { code: 400, message: error.message } });
  }
}
