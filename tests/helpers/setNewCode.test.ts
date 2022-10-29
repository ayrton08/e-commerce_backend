import { setNewCode } from "helpers/setNewCode";
import { Auth } from "models/Auth";

describe("setNewCode()", () => {
  test("should first", () => {
    const auth = new Auth("id");
    const result = setNewCode(auth);
    console.log(result);
  });
});
