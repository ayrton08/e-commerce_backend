import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { authMiddleware, validationMiddleware } from "middlewares";
import { findUserById } from "controllers/user-controller";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const user = await findUserById(token.userId);

  res.status(200).send({ error: null, data: { ...user.data } });
}

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const newData = req.body;

  try {
    const user = await findUserById(token.userId);
    user.data = {
      ...user.data,
      ...newData,
    };
    user.push();

    res.status(200).send({ error: null, data: { ...user.data } });
  } catch (error) {
    res.status(400).send({ error: { code: 400, message: error.message } });
  }
}

const patchMe = authMiddleware(patch);
const getMe = authMiddleware(get);

const handler = methods({
  patch: patchMe,
  get: getMe,
});

export default validationMiddleware(handler, null, null);
