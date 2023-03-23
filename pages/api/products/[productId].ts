import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import * as Yup from 'yup';

import { validationMiddleware } from '../../../middlewares';
import { findProductById } from '../../../controllers/product-controller';

const schema = Yup.object()
  .shape({
    productId: Yup.string().required(),
  })
  .noUnknown()
  .strict();

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const productId = req.query.productId as string;

  try {
    const product = await findProductById(productId);

    res.status(201).send({ error: null, product });
  } catch (error) {
    res.status(404).send({
      error: { code: 404, message: error.message },
    });
  }
}

const handler = methods({
  get,
});

export default validationMiddleware(handler, schema, null);
