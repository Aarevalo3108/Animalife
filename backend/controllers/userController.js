import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import options from "../tools/options.js";
import regex from "../tools/regex.js";

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
    // Encrypt password with sha256 algorithm
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    // Para verificar la contraseña:
    // const verified = bcrypt.compareSync(userEnteredPassword, passwordHash);
    const role = await Role.findById(req.body.role);
    if (!role) {
      return res.status(400).json({message: "Role not found, check the ID"});
    }
    req.body.role = role._id;
    const user = new User(req.body);
    await user.save();
    const paginatedUser = await User.paginate({deleted: false, _id: user._id}, options);
    return res.status(201).json(paginatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: error.message});
  }
}

export const submitImg = async (req, res) => {
  try {
    console.log(req.file);
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


export const updateUser = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    if(!regex.name.test(req.body.name)){
      return res.status(500).json({message: "Name is not valid"})
    }
    if(!regex.lastName.test(req.body.lastName)){
      return res.status(500).json({message: "Last name is not valid"})
    }
    if(!regex.email.test(req.body.email)){
      return res.status(500).json({message: "Email is not valid"})
    }
    const user = await User.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
    const paginatedUser = await User.paginate({deleted: false, _id: user._id}, options);
    return res.status(200).json(paginatedUser);
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



