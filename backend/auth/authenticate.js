import getTokenFromHeader from "./getTokenFromHeader.js"
import { verifyAccessToken } from "./verifyTokens.js";



const authenticate = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    console.log("token not found: ", token);
    return res.status(401).json({ message: "Access Unauthorized" });
  }
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    console.log("token not valid: ", decoded);
    return res.status(401).json({ message: "Access Unauthorized" });
  }
  req.user = {...decoded.user};
  next();
}


export default authenticate