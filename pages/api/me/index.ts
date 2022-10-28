import type { NextApiRequest, NextApiResponse } from "next";
import method from "micro-method-router";

import { authMiddleware } from "middlewares/middlewares";
import { User } from "models/User";

async function get(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const user = new User(token.userId);
  await user.pull();

  res.status(200).send(user.data);
}

async function patch(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const newData = req.body;

  const user = new User(token.userId);
  await user.pull();
  user.data = {
    ...user.data,
    ...newData,
  };
  user.push();

  res.status(200).send(user.data);
}

const handler = method({
  get,
  patch,
});

export default authMiddleware(handler);
