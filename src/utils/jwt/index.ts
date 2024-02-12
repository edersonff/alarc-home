import jwt from "jsonwebtoken";

const secret = String(process.env.JWT_SECRET || "s3cr3t!@#$%");

export const sign = (payload: any) =>
  jwt.sign(payload, secret, { expiresIn: "1y" });

export const verify = (token: string) => jwt.verify(token, secret);

export const decode = (token: string) => jwt.decode(token);

export const verifyToken = (req: Request) => {
  const token = req.headers.get("authorization");

  const tokenWithoutBearer = token?.replace("Bearer ", "");

  if (!tokenWithoutBearer) {
    return false;
  }

  try {
    verify(tokenWithoutBearer);
    return true;
  } catch (error) {
    return false;
  }
};

export default { sign, verify, decode };
