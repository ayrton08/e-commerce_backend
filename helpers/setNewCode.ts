import { addMinutes } from "date-fns";
import gen from "random-seed";
import { Auth } from "models/Auth";

export const randomCode = (): number => {
  const random = gen.create();
  const code = random.intBetween(10000, 99999);
  return code;
};

export const setNewCode = async (auth: Auth): Promise<number> => {
  const code: number = randomCode();
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  return code;
};
