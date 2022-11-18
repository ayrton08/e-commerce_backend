/* eslint-disable @typescript-eslint/no-explicit-any */
import { products } from "../lib/algolia";
import { generate } from "../lib/jwt";
import { createPreference, getMerchantOrder } from "../lib/mercadopago";
import { sendEmail } from "../lib/sendGrid";
import { Auth } from "../models/Auth";
import { Order } from "../models/Order";
import { findUserById } from "./user-controller";

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
    throw new Error("Product not found");
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

export const createToken = async (email: string, code: number) => {
  const auth = await Auth.findByEmailAndCode(email, code);
  const codeUsed = await Auth.findByEmailAndCode(email, null);

  if (codeUsed) {
    throw new Error(
      "code is already used or invalid, you have to create another one"
    );
  }

  if (!auth) {
    throw new Error("email or code invalid");
  }

  const expires = auth.isCodeExpired();

  if (expires) {
    throw new Error("expired code");
  }
  const token = generate({ userId: auth.data.userId });
  await Auth.deleteUsedCode(code);

  return {
    token,
  };
};

export const findOrderById = async (orderId: string): Promise<Order> => {
  const order = new Order(orderId);
  await order.pull();
  return order;
};

export const updateStatusPayment = async (
  topic: string,
  id: string
): Promise<void> => {
  if (topic === "merchant_order") {
    const order = await getMerchantOrder(id);
    if (order.order_status === "paid") {
      const orderId = order.external_reference;

      const myOrder = await findOrderById(orderId);

      const user = await findUserById(myOrder.data.userId);

      myOrder.data.status = "closed";

      if (myOrder.data.status === "closed" && order.order_status === "paid") {
        try {
          sendEmail({
            addressee: user.data.email,
            message: "The payment was successful",
            title: "Payment status",
          });
        } catch (error) {
          console.error(error.message);
        }
      }
      await myOrder.push();
    }
  }
};
