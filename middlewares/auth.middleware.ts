import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "lib/jwt";
import parseToken from "parse-bearer-token";

export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) {
      res
        .status(401)
        .send({ error: { code: 404, message: "Token is a required field" } });
    }

    const decodedToken = decode(token);

    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res
        .status(401)
        .send({ error: { code: 401, message: "Token provided is invalid" } });
    }
  };
}
