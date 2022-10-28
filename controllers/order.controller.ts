/* eslint-disable @typescript-eslint/no-explicit-any */
import { products } from "lib/algolia";
import { createPreference } from "lib/mercadopago";
import { Order } from "models/Order";

interface CreateOrder {
  productId: string;
  token: { userId: string };
  aditionalInfo: any;
}

export const createOrder = async ({
  productId,
  token,
  aditionalInfo,
}: CreateOrder) => {
  const product = await products.getObject(productId);

  if (!product) {
    throw "not found";
  }

  const order = await Order.createNewOrder({
    aditionalInfo,
    productId,
    userId: token.userId,
    status: "pending",
    createdAt: new Date(),
  });

  const pref = await createPreference({
    ...aditionalInfo,
    external_reference: order.id,
  });

  await order.updateOrder(order.id, pref.init_point);

  const orderId = order.id;
  const url = pref.init_point;

  return {
    url,
    orderId,
  };
};
