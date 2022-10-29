import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "models/Order";
import { sendEmail } from "lib/sendGrid";
import { findUserById } from "controllers/user.controller";
import { findOrderById } from "controllers/order.controller";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query;
    if (topic === "merchant_order") {
      const order = await getMerchantOrder(id);
      if (order.order_status === "paid") {
        // enviar un email de que salio todo bien

        const orderId = order.external_reference;

        const myOrder = await findOrderById(orderId);

        const user = await findUserById(myOrder.data.userId);

        sendEmail({
          addressee: user.data.email,
          message: "The payment was successful",
          title: "Payment status",
        });

        myOrder.data.status = "closed";
        await myOrder.push();
      }
    }
    res.status(200).send(true);
  },
});
