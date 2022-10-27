/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from "lib/firestore";

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

  static async createNewOrder(newOrderData = {}) {
    const newOrderSnap = await collection.add(newOrderData);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = newOrderData;
    return newOrder;
  }
}
