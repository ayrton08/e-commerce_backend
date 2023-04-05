import { firestore } from '../lib/firestore';
import { IOrder } from '../interfaces/order';
import { randomCode } from '../helpers/setnewcode';

const collection = firestore.collection('orders');

export default class Order {
  ref: FirebaseFirestore.DocumentReference;
  order: IOrder;

  constructor(order: IOrder) {
    const id = randomCode().toString();
    this.ref = collection.doc(id);
    this.order = order;
    this.order.id = id;
  }
  async save() {
    this.ref.set(this.order);
  }

  async pull() {
    const snap = await this.ref.get();
    return snap.data();
  }

  async updateStatusPaid(status: boolean): Promise<void> {
    this.order.isPaid = status;
    await this.save();
  }

  async setLinkToPay(link: string): Promise<void> {
    this.order.linkToPay = link;
    await this.save();
  }

  static async getOrdersByUser(user: string): Promise<IOrder[] | []> {
    const results = await collection.where('user', '==', user).get();
    const orders = [];
    results.forEach((doc) => {
      orders.push(doc.data());
    });
    return orders;
  }

  static async findById(id: string): Promise<any> {
    const docRef = collection.doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
      return doc.data();
    } else {
      return null;
    }
  }

  // const orders = results.docs.map((data) => {
  //   return data.data();
  // });

  // static async createNewOrder(newOrderData = {}) {
  //   const newOrderSnap = await collection.add(newOrderData);
  //   const newOrder = new Order(newOrderSnap.id);
  //   newOrder.order = newOrderData;
  //   return newOrder;
  // }
  // async updateOrder(reference, linkToPay) {
  //   this.order.aditionalInfo.external_reference = reference;
  //   this.order.aditionalInfo.linkToPay = linkToPay;
  //   await this.push();
  // }

  // static async getOrdersByUserId(userId: string) {
  //   const results = await collection.get();
  //   const orders = results.docs.map((data) => {
  //     return data.data();
  //   });

  //   const myOrders = orders.filter((order) => order.userId === userId);

  //   return myOrders;
  // }

  // static async getOrderById(orderId: string) {
  //   const order = new Order(orderId);
  //   await order.pull();
  //   if (!order.order) {
  //     throw new Error('Order not found');
  //   }
  //   return order.order;
  // }
}
