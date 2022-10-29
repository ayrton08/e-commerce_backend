import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { validationMiddleware } from "middlewares";
import { bodyAuthToken } from "schemas/auth.validation";
import { createToken } from "controllers/order.controller";

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { email, code } = req.body;
  try {
    const { token } = await createToken(email, code);
    res.status(201).send({ error: null, token });
  } catch (error) {
    res.status(401).send({
      error: { code: 401, message: error.message },
    });
  }
}

const handler = methods({
  post,
});

export default validationMiddleware(handler, null, bodyAuthToken);
