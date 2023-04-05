import type { NextApiRequest, NextApiResponse } from 'next';
import methods from 'micro-method-router';
import * as Yup from 'yup';

import { authMiddleware, validationMiddleware } from 'middlewares';
import { getOrderById } from 'controllers';

const schema = Yup.object()
  .shape({
    id: Yup.string().required(),
  })
  .noUnknown()
  .strict();

async function get(req: NextApiRequest, res: NextApiResponse) {
  return getOrderById(req, res);
}

const getAuth = authMiddleware(get);

const handler = methods({
  get: getAuth,
});

export default validationMiddleware(handler, schema, null);
