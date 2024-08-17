import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

export { verifyAccessToken, verifyRefreshToken };
