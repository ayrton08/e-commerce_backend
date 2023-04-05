import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from 'models';
import { IOrder } from '../../interfaces/order';

type Data =
  | {
      error: {
        message: string;
        code: number;
      };
    }
  | {
      order: IOrder;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return createOrder(req, res);
}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const newOrder = new Order({ ...req.body, isPaid: false, user: 'ayrton' });

    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: { code: 400, message: error.message } });
  }
}
