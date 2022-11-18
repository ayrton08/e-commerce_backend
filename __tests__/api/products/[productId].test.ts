import { mockReqRes } from "../../../__mocks__/requestMock";
import { get } from "../../../pages/api/products/[productId]";
import { product } from "../../../__mocks__/fixtures/products";

import { findProductById } from "../../../controllers/product-controller";

jest.mock("../../../controllers/product.controller");

const options = {
  query: {
    productId: "123456",
  },
};

describe("api/products/:id", () => {
  const { req, res } = mockReqRes("GET", options);

  const expectedResponse = {
    error: null,
    product,
  };

  test("should return a product", async () => {
    (findProductById as jest.Mock).mockResolvedValue(product);

    await get(req, res);

    const response = res._getData();
    expect(response).toEqual(expectedResponse);
  });

  test("should return a error response if an invalid productId is provided", async () => {
    const expetedResponse = {
      error: {
        code: 404,
        message: "no id",
      },
    };

    (findProductById as jest.Mock).mockReturnValueOnce(
      Promise.reject(new Error("no id"))
    );

    await get(req, res);

    const response = res._getData();
    expect(response).toEqual(expetedResponse);
  });
});
