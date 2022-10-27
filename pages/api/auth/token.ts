import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { Auth } from "models/Auth";
import { generate } from "lib/jwt";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { email, code } = req.body;
    const auth = await Auth.findByEmailAndCode(email, code);

    if (!auth) {
      res.status(401).send({ message: "email or code invalid" });
    }

    const expires = auth.isCodeExpired();

    if (expires) {
      res.status(401).send({ message: "token expirado" });
    }
    const token = generate({ userId: auth.data.userId });

    res.send({ token });
  },
});

// export default async function (req: NextApiRequest, res: NextApiResponse) {
//   const {} = req.bosy
//   const auth = await Auth.findByEmailAndCode(req.body.email, req.body.code);

//   if (!auth) {
//     res.status(401).send({ message: "email or code invalid" });
//   }

//   const expires = auth.isCodeExpired();

//   if (expires) {
//     res.status(401).send({ message: "token expirado" });
//   }
//   const token = generate({ userId: auth.data.userId });

//   res.send({token});
// }
