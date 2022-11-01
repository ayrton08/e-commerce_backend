import { User } from "../models/User";

export const findUserById = async (userId: string): Promise<User> => {
  const user = new User(userId);
  await user.pull();
  return user;
};

export const updateAddress = async (token, address) => {
  const user = new User(token.userId);

  await user.pull();

  user.data.address = {
    ...user.data.address,
    ...address,
  };
  await user.push();
  return user;
};
