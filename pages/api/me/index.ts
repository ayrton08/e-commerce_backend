import { authMiddleware } from "lib/middlewares";
import { User } from "models/User";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: { userId: string }
) {
  const user = new User(token.userId);
  await user.pull();

  res.send(user.data);
}

export default authMiddleware(handler);
