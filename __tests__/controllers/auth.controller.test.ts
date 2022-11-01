import { Auth } from "../../models/Auth";
import { User } from "../../models/User";
import { findOrCreateAuth } from "../../controllers/auth.controller";

jest.mock("../../models/Auth", () => {
  return {
    findByEmail: jest.fn((email) => email),
  };
});

describe("auth.controller", () => {
  test("should first", async () => {
    // const email = "test@mail.com";
    // const result = await findOrCreateAuth(email);
    // console.log(result);
  });
});
