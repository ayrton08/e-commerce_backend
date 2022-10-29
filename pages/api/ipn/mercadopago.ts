import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { getMerchantOrder } from "lib/mercadopago";
import { sendEmail } from "lib/sendGrid";
import { findUserById } from "controllers/user.controller";
import { findOrderById } from "controllers/order.controller";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query;
    if (topic === "merchant_order") {
      const order = await getMerchantOrder(id);
      if (order.order_status === "paid") {
        const orderId = order.external_reference;

        const myOrder = await findOrderById(orderId);

        const user = await findUserById(myOrder.data.userId);

        myOrder.data.status = "closed";

        res.status(200).send(true);

        if (myOrder.data.status === "closed") {
          try {
            sendEmail({
              addressee: user.data.email,
              message: "The payment was successful",
              title: "Payment status",
            });
            res.status(200).send(true);
          } catch (error) {
            console.error(error.message);
            res.status(200).send(true);
          }
        }
        await myOrder.push();
        res.status(200).send(true);
      }
    }

    res.status(200).send(true);
  },
});
