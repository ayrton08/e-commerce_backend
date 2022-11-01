import { Auth } from "../../models/Auth";

describe("Auth", () => {
  test("should return a cleaned email", () => {
    const dirtyEmail = " Test@mail.com";
    const cleanEmail = "test@mail.com";

    const result = Auth.cleanEmail(dirtyEmail);

    expect(result).toEqual(cleanEmail);
  });
});
