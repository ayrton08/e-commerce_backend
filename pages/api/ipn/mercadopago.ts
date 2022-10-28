import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "models/Order";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query;

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
        //sendEmail("tu pago fue confirmado")
      }
    }

    res.status(200).send(true);
  },
});
