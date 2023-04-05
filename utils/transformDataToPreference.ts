import { IOrder } from '../interfaces/order';

export const transformDataToPreference = (order: IOrder) => {
  console.log({ order });
  const ordersUpdated = order.orderItems.map((items) => ({
    ...items,
    unit_price: order.total,
    currency_id: 'ARS',
  }));

  return ordersUpdated;
};
