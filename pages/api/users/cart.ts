import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const user = {
      email: "",
      id: "",
      cart: [],
    };
    const cart = user.cart;
    cart.push(req.body.productID);
    user.cart = cart;
    res.send(user);
  },
});

