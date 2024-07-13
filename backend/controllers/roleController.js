import Role from "../models/roleModel.js";
import options from "../tools/options.js";
import regex from "../tools/regex.js";


export const getRoles = async (req, res) => {
  try {
    options.page = Number(req.query.page) || 1;
    options.limit = Number(req.query.limit) || 12;
    const roles = await Role.paginate({deleted: false}, options);
    res.json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const createRole = async (req, res) => {
  try {
    if(!regex.name.test(req.body.name)){
      return res.status(500).json({message: "Name is not valid"})
    }
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const getRoleById = async (req, res) => {
  try {
    const role = await Role.paginate({deleted: false, _id: req.params.id}, options);
    res.json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const updateRole = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    if(!regex.name.test(req.body.name)){
      return res.status(500).json({message: "Name is not valid"})
    }
    const role = await Role.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
    const paginatedRole = await Role.paginate({deleted: false, _id: role._id}, options);
    console.log(paginatedRole);
    res.json(paginatedRole);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
    res.json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

