import * as Yup from "yup";

export const reqProduct = Yup.object()
  .shape({
    productId: Yup.string().required(),
  })
  .noUnknown()
  .strict();

export const reqProductIndex = Yup.object().shape({
  search: Yup.string(),
});
