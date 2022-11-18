import { post } from "../../../pages/api/auth/token";
import { createToken } from "../../../controllers/order-controller";
import { mockReqRes } from "../../../__mocks__/requestMock";

jest.mock("../../../controllers/order.controller");

const options = { body: { email: "test@gmail.com", code: 13957 } };

describe("api/auth/token", () => {
  test("should return a jwt token", async () => {
    const expetedResponse = {
      error: null,
      token: "123456789",
    };
    (createToken as jest.Mock).mockResolvedValue(expetedResponse);

    const { req, res } = mockReqRes("POST", options);
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

    const { req, res } = mockReqRes("POST", options);
    await post(req, res);

    const response = res._getData();

    expect(response).toEqual(expetedResponse);
    expect(res.statusCode).toBe(401);
  });
});
