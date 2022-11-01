import { NextApiRequest, NextApiResponse } from "next";
import { createMocks, RequestMethod } from "node-mocks-http";

export function mockReqRes(method: RequestMethod = "POST", options?) {
  const {
    req,
    res,
  }: { req: NextApiRequest | any; res: NextApiResponse | any } = createMocks({
    method,
  });

  req.helpers = options?.helpers;
  req.body = options?.body;

  return { req, res };
}
