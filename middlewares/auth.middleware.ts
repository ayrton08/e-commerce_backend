import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "lib/jwt";
import parseToken from "parse-bearer-token";
import { JwtPayload } from "jsonwebtoken";

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string | JwtPayload
) => void;

export function authMiddleware(handler: Handler) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) {
      res
        .status(401)
        .send({ error: { code: 404, message: "Token is a required field" } });
    }

    const decodedToken = decode(token);

    if (decodedToken) {
      handler(req, res, decodedToken);
    } else {
      res
        .status(401)
        .send({ error: { code: 401, message: "Token provided is invalid" } });
    }
  };
}
