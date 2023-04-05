import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO,
});

export async function getMerchantOrder(id) {
  try {
    const res = await mercadopago.merchant_orders.get(id);
    return res.body;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createPreference(data) {
  try {
    const res = await mercadopago.preferences.create(data);
    console.log({ res });
    return res.body;
  } catch (error) {
    console.error(error.message);
  }
}
