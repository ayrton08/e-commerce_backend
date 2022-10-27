import jwt from "jsonwebtoken";

export function generate(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
}

export function decode(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("invalid token");
    return null;
  }
}
