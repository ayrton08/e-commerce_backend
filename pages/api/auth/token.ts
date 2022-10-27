import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { Auth } from "models/Auth";
import { generate } from "lib/jwt";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { email, code } = req.body;
    const auth = await Auth.findByEmailAndCode(email, code);
    const codeUsed = await Auth.findByEmailAndCode(email, 0);

    if (codeUsed) {
      res.status(401).send({ message: "code is already used or invalid, you have to create another one" });
    }

    if (!auth) {
      res.status(401).send({ message: "email or code invalid" });
    }

    const expires = auth.isCodeExpired();

    if (expires) {
      res.status(401).send({ message: "expired code" });
    }
    const token = generate({ userId: auth.data.userId });
    await Auth.deleteUsedCode(code);

    res.status(201).send({ token });
  },
});
