import * as Yup from "yup";

export const bodyMeAddress = Yup.object()
  .shape({
    address: Yup.object().required(),
  })
  .noUnknown()
  .strict();

export const bodyMe = Yup.object().required();
