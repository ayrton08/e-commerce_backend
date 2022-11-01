/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "../../../pages/api/auth";
import { mockReqRes } from "../../../__mocks__/requestMock";

describe("api/auth", () => {
  const options = { body: { email: "test@gmail.com" } };

  test("should return a successful response", async () => {
    const { req, res } = mockReqRes("POST", options);
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
