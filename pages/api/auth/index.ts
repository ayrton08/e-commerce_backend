import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { findOrCreateAuth, sendCode } from "controllers/auth.controller";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;
    const auth = await findOrCreateAuth(email);
    if (auth) {
      sendCode(email);
    }

    res.send(auth);
  },
});
