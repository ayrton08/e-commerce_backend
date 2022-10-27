import { User } from "models/User";
import { Auth } from "models/Auth";
import gen from "random-seed";
import { addMinutes } from "date-fns";

const seed = "my secret";
const random = gen.create(seed);

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const twentyMinutesFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinutesFromNow;
  await auth.push();
  console.log("enviamos al " + email + "el codigo " + code);
  // en esta linea usar sendGrid para enviar el email
  return true;
}

export async function findOrCreateAuth(email: string): Promise<Auth> {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);

  if (auth) {
    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });
    console.log(newUser);
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
  }
}
