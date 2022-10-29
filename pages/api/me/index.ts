import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { authMiddleware, validationMiddleware } from "middlewares";
import { User } from "models/User";
import { findUserById } from "controllers/user.controller";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const user = new User(token.userId);
  await user.pull();

  const data = user.data;

  res.status(200).send({ error: false, data });
}

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const newData = req.body;

  const user = await findUserById(token.userId);
  user.data = {
    ...user.data,
    ...newData,
  };
  user.push();

  const data = user.data;

  res.status(200).send({ error: false, data });
}

const patchMe = authMiddleware(patch);
const getMe = authMiddleware(get);

const handler = methods({
  patch: patchMe,
  get: getMe,
});

export default validationMiddleware(handler, null, null);
