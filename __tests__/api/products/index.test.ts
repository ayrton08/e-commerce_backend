import { mockReqRes } from "../../../__mocks__/requestMock";
import { get } from "../../../pages/api/products";
import { products } from "../../../__mocks__/fixtures/products";

import { findProductsWithPagination } from "../../../controllers/product.controller";

jest.mock("../../../controllers/product.controller");

describe("api/products", () => {
  const { req, res } = mockReqRes("GET");

  test("should return products", async () => {
    const expetedResponse = {
      error: null,
      results: products.hits,
      pagination: {
        offset: 0,
        limit: 10,
        total: products.nbHits,
      },
    };
    (findProductsWithPagination as jest.Mock).mockReturnValueOnce(products);

    await get(req, res);

    const response = res._getData();
    expect(response).toEqual(expetedResponse);
  });
});
