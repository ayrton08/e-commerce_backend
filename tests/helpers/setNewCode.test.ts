import { randomCode } from "../../helpers/setNewCode";

describe("randomCode()", () => {
  test("always should yield a diferente random code", () => {
    const firstCode = randomCode();
    const secondCode = randomCode();

    expect(firstCode).not.toEqual(secondCode);
  });
  test("should return a number with 5 digits", () => {
    const code = randomCode().toString();

    expect(code.length).toBe(5);
  });
});
// describe("setNewCode()", () => {
//   test("always should yield a diferente random code", () => {
//     const firstCode = randomCode();
//     const secondCode = randomCode();

//     expect(firstCode).not.toEqual(secondCode);
//   });
// });
