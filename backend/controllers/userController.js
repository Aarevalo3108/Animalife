import bcrypt from "bcrypt";
import User from "../models/userModel";
import options from "../tools/options";
import {regex} from "../tools/regex";

export const hello = async (req, res) => {
  return res.status(200).json({message: "Hello World!"});
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.paginate({}, options);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}


export const getUserById = async (req, res) => {
  try {
    const user = await User.paginate({_id: req.params.id}, options);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}


export const createUser = async (req, res) => {
  try {
    if(regex.name.test(req.body.name)){
      res.status(500).json({message: "Name is not valid"})
    }
    if(regex.lastName.test(req.body.lastName)){
      res.status(500).json({message: "Last name is not valid"})
    }
    if(regex.email.test(req.body.email)){
      res.status(500).json({message: "Email is not valid"})
    }
    if(regex.password.test(req.body.password)){
      res.status(500).json({message: "Password is not valid"})
    }
    // Encrypt password with sha256 algorithm
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    // Para verificar la contraseña:
    // const verified = bcrypt.compareSync(userEnteredPassword, passwordHash);
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}


export const updateUser = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const user = await User.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}



