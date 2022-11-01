import { mockReqRes } from "../../../__mocks__/requestMock";
import { get } from "../../../pages/api/products/[productId]";
import { product } from "../../../__mocks__/fixtures/products";

import { findProductById } from "../../../controllers/product.controller";

jest.mock("../../../controllers/product.controller");

const options = {
  headers: {
    query: {
      productId: "123456",
    },
  },
};

describe("api/products/:id", () => {
  const { req, res } = mockReqRes("GET", options);

  test("should return a product", async () => {
    const expetedResponse = {
      error: null,
      product,
    };

    (findProductById as jest.Mock).mockReturnValue(product);

    await get(req, res);

    const response = res._getData();
    expect(response).toEqual(expetedResponse);
  });

  test("should return a error response if an invalid productId is provided", async () => {
    const expetedResponse = {
      error: null,
      product,
    };

    (findProductById as jest.Mock).mockReturnValue(new Error());

    await get(req, res);

    const response = res._getData();
    expect(response).toEqual(expetedResponse);
  });
});
