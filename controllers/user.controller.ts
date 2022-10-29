import { User } from "models/User";

export const findUserById = async (userId: string): Promise<User> => {
  const user = new User(userId);
  await user.pull();
  return user;
};
