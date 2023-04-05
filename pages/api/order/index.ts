import type { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import { authMiddleware, validationMiddleware } from 'middlewares';
import methods from 'micro-method-router';
import { createOrder, findOrders } from 'controllers/order-controller';
import { JwtPayload } from 'jsonwebtoken';

// const schemaBody = Yup.object()
//   .shape({
//     items: Yup.array()
//       .of(
//         Yup.object({
//           title: Yup.string(),
//           description: Yup.string(),
//           picture_url: Yup.string(),
//           category_id: Yup.string(),
//           quantity: Yup.number(),
//           currency_id: Yup.string(),
//           unit_price: Yup.number(),
//         })
//       )
//       .required(),
//     back_urls: Yup.object({
//       success: Yup.string(),
//       failure: Yup.string(),
//     }).required(),
//     notification_url: Yup.string().required(),
//   })
//   .noUnknown()
//   .strict();

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  user: JwtPayload
) {
  return createOrder(req, res, user);
}

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  user: JwtPayload
) {
  return findOrders(req, res, user);
}

const postAuth = authMiddleware(post);
const getAuth = authMiddleware(get);

const handler = methods({
  post: postAuth,
  get: getAuth,
});

export default validationMiddleware(handler, null, null);
