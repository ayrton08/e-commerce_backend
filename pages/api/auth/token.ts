import type { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";

import methods from "micro-method-router";
import { validationMiddleware } from "../../../middlewares";
import { createToken } from "../../../controllers/order-controller";

const schema = Yup.object()
  .shape({
    email: Yup.string().required(),
    code: Yup.number().required(),
  })
  .noUnknown()
  .strict();

export async function post(req: NextApiRequest, res: NextApiResponse) {
  const { email, code } = req.body;
  try {
    const { token } = await createToken(email, code);
    if (!token) throw new Error("Token was not create");

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

export default validationMiddleware(handler, null, schema);
