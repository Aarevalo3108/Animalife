import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import 'dotenv/config';


const createDefaultAdminUser = async () => {
  try {
    console.log("[INFO]: Creating default admin user...");
    // Ensure the admin role exists
    const adminRole = await Role.findOneAndUpdate(
      { name: "Admin" },
      { $setOnInsert: { name: "Admin" } },
      { upsert: true, new: true }
    );

    // Check if the admin user already exists
    const adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL || "admin@example.com" });
    if (!adminUser) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "adminPassword", 10);

      // Create the admin user
      const newAdminUser = new User({
        name: "Admin",
        lastName: "User",
        phone: "1234567890",
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        password: hashedPassword,
        role: adminRole._id,
        purchases: []
      });

      await newAdminUser.save();
      console.log("[DONE]: Default admin user created.");
    } else {
      console.log("[INFO]: Admin user already exists.");
    }
  } catch (error) {
    console.error("[ERROR]: Error creating default admin user:", error);
  }
};

export default createDefaultAdminUser;