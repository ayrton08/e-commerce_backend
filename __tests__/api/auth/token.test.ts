/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import { post } from "../../../pages/api/auth/token";
import { createToken } from "../../../controllers/order.controller";

jest.mock("../../../controllers/order.controller");

function mockRequestResponse(method: RequestMethod = "POST") {
  const {
    req,
    res,
  }: { req: NextApiRequest | any; res: NextApiResponse | any } = createMocks({
    method,
  });

  req.body = { email: "test@gmail.com", code: 13957 };

  return { req, res };
}

describe("api/auth/token", () => {
  test("should return a jwt token", async () => {
    (createToken as jest.Mock).mockResolvedValue({ token: "123456789" });

    const expetedResponse = {
      error: null,
      token: "123456789",
    };

    const { req, res } = mockRequestResponse();
    await post(req, res);

    const response = res._getData();

    expect(response).toEqual(expetedResponse);
    expect(res.statusCode).toBe(201);
    expect(res.statusMessage).toEqual("OK");
  });

  test("should return a error response if token wasn't create", async () => {
    const expetedResponse = {
      error: {
        code: 401,
        message: "Token was not create",
      },
    };

    (createToken as jest.Mock).mockResolvedValue(new Error());

    const { req, res } = mockRequestResponse();
    await post(req, res);

    const response = res._getData();

    expect(response).toEqual(expetedResponse);
    expect(res.statusCode).toBe(401);
  });
});
