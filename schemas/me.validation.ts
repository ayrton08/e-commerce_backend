import * as Yup from "yup";

export const bodyMeAddress = Yup.object()
  .shape({
    address: Yup.object({
      street: Yup.string(),
      city: Yup.string(),
      neighborhood: Yup.string(),
    })
      .required()
      .noUnknown()
      .strict(),
  })
  .noUnknown()
  .strict();
