import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import options from "../tools/options.js";
import regex from "../tools/regex.js";
import getUserInfo from "../tools/getUserInfo.js";
import getTokenFromHeader from "../auth/getTokenFromHeader.js";
import { verifyAccessToken, verifyRefreshToken } from "../auth/verifyTokens.js";
import Token from "../models/tokenModel.js";
import { generateAccessToken } from "../auth/generateToken.js";
import transporter from "../tools/mailAdapter.js";
import "dotenv/config";

export const hello = async (req, res) => {
  return res.status(200).json({message: "Hello World!"});
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.paginate({deleted: false}, options);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}


export const getUserById = async (req, res) => {
  try {
    const user = await User.paginate({_id: req.params.id, deleted: false}, options);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}


export const createUser = async (req, res) => {
  try {
    if(!regex.name.test(req.body.name)){
      return res.status(500).json({message: "Name is not valid"})
    }
    if(!regex.lastName.test(req.body.lastName)){
      return res.status(500).json({message: "Last name is not valid"})
    }
    if(!regex.email.test(req.body.email)){
      return res.status(500).json({message: "Email is not valid"})
    }
    if(!regex.password.test(req.body.password)){
      return res.status(500).json({message: "Password is not valid. Must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."})
    }
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) {
      return res.status(400).json({message: "Email already exists"});
    }
    // Encrypt password with sha256 algorithm
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    // Para verificar la contraseña:
    // const verified = bcrypt.compareSync(userEnteredPassword, passwordHash);
    const role = await Role.find({name: "User"});
    if (role.length === 0) {
      return res.status(400).json({message: "Role not found, check if role exists"});
    }
    req.body.role = role[0]._id;
    const user = new User(req.body);
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'Welcome to Animalife',
      text: `Hello ${req.body.name} ${req.body.lastName}! Welcome to Animalife. Your account was created successfully.`
    }
    const mail = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${mail.messageId}`);
    await user.save();
    const paginatedUser = await User.paginate({deleted: false, _id: user._id}, options);
    return res.status(201).json({paginatedUser});
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}

export const submitImg = async (req, res) => {
  try {
    if(req.file === undefined){
      return res.status(500).json({message: "image not found"});
    }
    if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg"){
      return res.status(500).json({message: `image, ${req.file.filename}, not valid, only png, jpg and jpeg allowed`});
    }
    if(req.file.size > 5000000 || req.file.size === 0){
      return res.status(500).json({message: `image, ${req.file.filename}, not valid, max 5MB allowed and not empty`});
    }
    const user = await User.findByIdAndUpdate({_id: req.params.id, deleted: false}, {image: req.file.path}, {new: true});
    const paginatedUser = await User.paginate({deleted: false, _id: user._id}, options);
    return res.status(201).json(paginatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const authUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email, deleted: false});
    if (!user) {
      return res.status(400).json({message: "Invalid email or password"});
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({message: "Invalid email or password"});
    }
    const accessToken = user.createAccessToken();
    const refreshToken = await user.createRefreshToken();
    return res.status(200).json({ user: getUserInfo(user) , accessToken, refreshToken});
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}


export const logout = async (req, res) => {
  try {
    const refreshToken = getTokenFromHeader(req);
    if (!refreshToken) {
      return res.status(401).json({message: "Access Unauthorized"});
    }
    const found = await Token.findOne({token: refreshToken});
    if (!found) {
      return res.status(401).json({message: "Access Unauthorized"});
    }
    await Token.deleteOne({token: refreshToken});
    return res.status(200).json({message: "Logout successful"});
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = getTokenFromHeader(req);
    if (!refreshToken) {
      return res.status(401).json({message: "Access Unauthorized"});
    }
    const found = await Token.findOne({token: refreshToken});
    if (!found) {
      return res.status(401).json({message: "Access Unauthorized"});
    }
    const payload = verifyRefreshToken(found.token);
    if(!payload){
      return res.status(401).json({message: "Access Unauthorized"});
    }
    const accessToken = generateAccessToken(payload.user);
    return res.status(200).json({accessToken});
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}

export const userData = async (req, res) => {
  const user = await User.findOne({_id: req.user._id, deleted: false});
  return res.status(200).json(getUserInfo(user));
}


export const updateUser = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    if(!regex.name.test(req.body.name) && req.body.name !== undefined){
      return res.status(500).json({message: "Name is not valid"})
    }
    if(!regex.lastName.test(req.body.lastName) && req.body.lastName !== undefined){
      return res.status(500).json({message: "Last name is not valid"})
    }
    if(!regex.email.test(req.body.email) && req.body.email !== undefined){
      return res.status(500).json({message: "Email is not valid"})
    }
    if(req.body.password){
      if(!regex.password.test(req.body.password)){
        return res.status(500).json({message: "Password is not valid. Must have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."})
      }
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if(req.body.role){
      const role = await Role.findOne({name: req.body.role, deleted: false});
      if(!role){
        return res.status(500).json({message: "Role not valid, check if role exists"})
      }
      req.body.role = role._id;
    }
    const user = await User.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
    return res.status(200).json({user: getUserInfo(user)});
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
    const paginatedUser = await User.paginate({deleted: false, _id: user._id}, options);
    return res.status(200).json(paginatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}



