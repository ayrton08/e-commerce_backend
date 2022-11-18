import { User } from "../models/User";
import { Auth } from "../models/Auth";
import { setNewCode } from "../helpers/setnewcode";
import { sendEmail } from "../lib/sendGrid";

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  await auth.pull()
  const code = await setNewCode(auth);
  await sendEmail({
    addressee: email,
    message: `Insert this code to enter ${code}. The code will expire in 20 minutes.`,
    title: `Your code to start section is ${code}.`,
  });
  console.log("enviamos al " + email + " el codigo " + code);
  return true;
}

export async function findOrCreateAuth(email: string): Promise<Auth> {
  const auth = await Auth.findByEmail(email);

  if (auth) {
    return auth;
  }
  const newUser = await User.createNewUser({
    email,
  });
  const newAuth = await Auth.createNewAuth({
    email,
    userId: newUser.id,
    code: "",
    expires: new Date(),
  });
  return newAuth;
}
