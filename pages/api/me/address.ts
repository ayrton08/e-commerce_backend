import type { NextApiRequest, NextApiResponse } from "next";
import method from "micro-method-router";

import { authMiddleware } from "middlewares/middlewares";
import { User } from "models/User";

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

  res.status(200).send(user.data);
}

const handler = method({
  patch,
});

export default authMiddleware(handler);
