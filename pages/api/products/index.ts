import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import * as Yup from 'yup';

import { getOffsetAndLimit } from '../../../helpers/requests';
import { validationMiddleware } from '../../../middlewares';
import { findProductsWithPagination } from '../../../controllers/product-controller';

export const schema = Yup.object().shape({
  search: Yup.string(),
});

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const { limit, offset } = getOffsetAndLimit(req);
  const search = req.query.search as string;

  try {
    const products = await findProductsWithPagination(search, limit, offset);
    res.status(201).send({
      error: null,
      results: products,
      pagination: {
        offset,
        limit,
        total: products[0].total,
      },
    });
  } catch (error) {
    res.status(400).send({ error: { code: 400, message: error.message } });
  }
}

const handler = methods({
  get,
});

export default validationMiddleware(handler, schema, null);
