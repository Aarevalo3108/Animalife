import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyAccessToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return payload;
  } catch (error) {
    return false;
  }
}

const verifyRefreshToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return payload;
  } catch (error) {
    return false;
  }
}

const verifyResetToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    return payload;
  } catch (error) {
    return false;
  }
}

export { verifyAccessToken, verifyRefreshToken, verifyResetToken };
