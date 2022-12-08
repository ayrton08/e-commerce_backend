import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import * as Yup from "yup";

import { authMiddleware, validationMiddleware } from "middlewares";
import { updateAddress } from "controllers/user-controller";

const schema = Yup.object()
  .shape({
    address: Yup.object({
      street: Yup.string(),
      city: Yup.string(),
      neighborhood: Yup.string(),
    })
      .required()
      .noUnknown()
      .strict(),
  })
  .noUnknown()
  .strict();

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const { address } = req.body;

  try {
    const user = await updateAddress(token, address);
    res.status(200).send({ error: null, data: { ...user.data } });
  } catch (error) {
    res.status(400).send({ error: { code: 400, message: error.message } });
  }
}

const patchAuth = authMiddleware(patch);

const handler = methods({
  patch: patchAuth,
});

export default validationMiddleware(handler, null, schema);
