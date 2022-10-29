import { getOffsetAndLimit } from "../../helpers/requests";

describe("getOffsetAndLimit()", () => {
  const req = {
    query: {},
  };
  afterEach(() => {
    req.query = {};
  });
  test("should return initial value", () => {
    const { limit, offset } = getOffsetAndLimit(req);

    expect(limit).toBe(10);
    expect(offset).toBe(0);
  });

  test("should return initial value if limit and offset are greater than the maximum or less than the minimum", () => {
    req.query = {
      limit: 20,
      offset: 20000,
    };
    const maximum = getOffsetAndLimit(req);

    expect(maximum.limit).toBe(10);
    expect(maximum.offset).toBe(0);

    req.query = {
      limit: -1,
      offset: -1,
    };
    const lower = getOffsetAndLimit(req);

    expect(lower.limit).toBe(10);
    expect(lower.offset).toBe(0);
  });
});
