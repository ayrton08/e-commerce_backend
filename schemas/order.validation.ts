import * as Yup from "yup";

export const reqOrder = Yup.object().shape({
  productId: Yup.string().required(),
});
export const bodyOrder = Yup.object()
  .shape({
    items: Yup.array()
      .of(
        Yup.object({
          title: Yup.string(),
          description: Yup.string(),
          picture_url: Yup.string(),
          category_id: Yup.string(),
          quantity: Yup.number(),
          currency_id: Yup.string(),
          unit_price: Yup.number(),
        })
      )
      .required(),
    back_urls: Yup.object({
      success: Yup.string(),
      failure: Yup.string(),
    }).required(),
    notification_url: Yup.string().required(),
  })
  .noUnknown()
  .strict();
