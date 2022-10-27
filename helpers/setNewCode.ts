import { addMinutes } from "date-fns";
import gen from "random-seed";
import { Auth } from "models/Auth";

const seed = "my secret";
const random = gen.create(seed);

export const setNewCode = async (auth: Auth) => {
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  return code;
};
