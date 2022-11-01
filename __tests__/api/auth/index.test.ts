import { createMocks, RequestMethod } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
import { post } from "../../../pages/api/auth";

describe("api/auth", () => {
  function mockRequestResponse(method: RequestMethod = "POST") {
    const {
      req,
      res,
    }: { req: NextApiRequest | any; res: NextApiResponse | any } = createMocks({
      method,
    });

    req.body = { email: "test@gmail.com" };

    return { req, res };
  }

  test("should return a successful response", async () => {
    const { req, res } = mockRequestResponse();
    await post(req, res);

    const response = res._getData();
    const expetedResponse = {
      data: {
        email: "test@gmail.com",
        userId: "1yYSo0BLjK8q2JbQFyEe",
      },
      error: null,
    };
    expect(res.statusCode).toBe(201);
    expect(response).toEqual(expetedResponse);
    expect(res.statusMessage).toEqual("OK");
  });
});
