import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { authMiddleware, validationMiddleware } from "middlewares";
import { bodyMeAddress } from "schemas/me-validation";
import { updateAddress } from "controllers/user-controller";

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

export default validationMiddleware(handler, null, bodyMeAddress);
