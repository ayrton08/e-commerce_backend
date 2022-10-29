import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "models/Order";
import { sendEmail } from "lib/sendGrid";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query;
    console.log("body", req.body);
    if (topic === "merchant_order") {
      const order = await getMerchantOrder(id);
      console.log(order);
      if (order.order_status === "paid") {
        // enviar un email de que salio todo bien

        const orderId = order.external_reference;
        const myOrder = new Order(orderId);
        await myOrder.pull();
        myOrder.data.status = "closed";
        await myOrder.push();
      }
    }

    res.status(200).send(true);
  },
});
