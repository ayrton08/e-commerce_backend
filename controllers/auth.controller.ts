import { User } from "models/User";
import { Auth } from "models/Auth";
import { setNewCode } from "helpers/setNewCode";

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = await setNewCode(auth);
  // en esta linea usar sendGrid para enviar el email
  console.log("enviamos al " + email + "el codigo " + code);
  return true;
}

export async function findOrCreateAuth(email: string): Promise<Auth> {
  const auth = await Auth.findByEmail(email);

  if (auth) {
    return auth;
  }
  const newUser = await User.createNewUser({
    email: email,
  });
  const newAuth = await Auth.createNewAuth({
    email: email,
    userId: newUser.id,
    code: "",
    expires: new Date(),
  });
  return newAuth;
}
