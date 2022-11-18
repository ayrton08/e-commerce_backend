import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { updateStatusPayment } from "controllers/order-controller";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    const topic = req.query.topic as string;

    try {
      await updateStatusPayment(topic, id);

      res.status(200).send(true);
    } catch (error) {
      console.log(error.message);
      res.status(200).send(true);
    }
  },
});
