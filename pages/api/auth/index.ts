import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { findOrCreateAuth, sendCode } from "controllers/auth.controller";
import { validationMiddleware } from "middlewares";
import { bodyAuth } from "schemas/auth.validation";

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  const auth = await findOrCreateAuth(email);
  if (auth) {
    sendCode(email);
  }
  delete auth.data.code;
  delete auth.data.expires;

  const data = { ...auth.data };

  res.status(201).send({ error: false, ...data });
}

const handler = methods({
  post,
});

export default validationMiddleware(handler, null, bodyAuth);
