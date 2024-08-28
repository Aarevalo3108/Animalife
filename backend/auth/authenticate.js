import getTokenFromHeader from "./getTokenFromHeader.js"
import Role from "../models/roleModel.js";
import { verifyAccessToken } from "./verifyTokens.js";



export const authenticate = (req, res, next) => {
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

export const adminAuthenticate = async (req, res, next) => {
  const role = await Role.findById(req.user.role);
  if (!role) {
    console.log("role not found: ", req.user.role);
    return res.status(401).json({ message: "Access Unauthorized" });
  }
  if (role.name !== "Admin") {
    console.log("role not valid: ", role.name);
    return res.status(401).json({ message: "Access Unauthorized" });
  }
  next();
}