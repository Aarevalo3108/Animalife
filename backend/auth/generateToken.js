import jwt from "jsonwebtoken";
import "dotenv/config";



const sign = (payload, isAccessToken) => {
  return jwt.sign(
    payload,
    isAccessToken ?
    process.env.ACCESS_TOKEN_SECRET :
    process.env.REFRESH_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: isAccessToken ? "1d" : "7d",
  });
}

export const generateAccessToken = (user) => {
  return sign({user}, true);
}

export const generateRefreshToken = (user) => {
  return sign({user}, false);
}
