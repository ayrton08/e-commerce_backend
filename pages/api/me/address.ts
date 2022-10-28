import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { authMiddleware, validationMiddleware } from "middlewares";
import { User } from "models/User";
import { bodyMe } from "schemas/me.validation";

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const { address } = req.body;

  const user = new User(token.userId);

  await user.pull();

  user.data.address = {
    ...user.data.address,
    ...address,
  };
  user.push();

  const data = user.data;

  res.status(200).send({ error: false, ...data });
}

const patchAuth = authMiddleware(patch);

const handler = methods({
  patch: patchAuth,
});

export default validationMiddleware(handler, null, bodyMe);
