import * as Yup from "yup";

export const bodyAuth = Yup.object()
  .shape({
    email: Yup.string().required(),
  })
  .noUnknown()
  .strict();

export const bodyAuthToken = Yup.object()
  .shape({
    email: Yup.string().required(),
    code: Yup.number().required(),
  })
  .noUnknown().strict();
