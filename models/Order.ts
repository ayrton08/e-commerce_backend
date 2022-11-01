/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from "../lib/firestore";

const collection = firestore.collection("orders");

export class Order {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;

  constructor(id: string) {
    this.id = id;
    this.ref = collection.doc(id);
  }
  async push() {
    this.ref.update(this.data);
  }

  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async updateOrder(reference, linkToPay) {
    this.data.aditionalInfo.external_reference = reference;
    this.data.aditionalInfo.linkToPay = linkToPay;
    await this.push();
  }

  static async createNewOrder(newOrderData = {}) {
    const newOrderSnap = await collection.add(newOrderData);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = newOrderData;
    return newOrder;
  }

  static async getOrdersByUserId(userId: string) {
    const results = await collection.get();
    const orders = results.docs.map((data) => {
      return data.data();
    });

    const myOrders = orders.filter((order) => order.userId === userId);

    return myOrders;
  }

  static async getOrderById(orderId: string) {
    const order = new Order(orderId);
    await order.pull();
    if (!order.data) {
      throw new Error("Order not found");
    }
    return order.data;
  }
}
