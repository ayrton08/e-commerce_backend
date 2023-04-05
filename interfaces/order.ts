export interface IOrder {
  id?: string;
  user: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  linkToPay?: string;
}

export interface IOrderItem {
  id: string;
  title: string;
  quantity: number;
  slug: string;
  images: string;
  price: number;
  gender: string;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}
