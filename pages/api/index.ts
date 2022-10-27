import type { NextApiRequest, NextApiResponse } from "next";
import { findOrCreateAuth } from "controllers/auth.controller";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const auth = await findOrCreateAuth(req.body.email);

  res.send(auth.data);
}
