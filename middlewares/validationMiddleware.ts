import type { NextApiRequest, NextApiResponse } from "next";

export function validationMiddleware(callback, reqValidator?, bodyValidator?) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      if (reqValidator) await reqValidator.validate(req.query);
      if (bodyValidator) await bodyValidator.validate(req.body);
      callback(req, res);
    } catch (error) {
      res.status(422).send({ error: true, message: error.message });
    }
  };
}
