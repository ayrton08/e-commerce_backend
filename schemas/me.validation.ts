import * as Yup from "yup";

export const bodyMe = Yup.object()
  .shape({
    address: Yup.object().required(),
  })
  .noUnknown()
  .strict();
