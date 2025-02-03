import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

// Admin login
// Handles the actual login logic, checks if the admin exists, compares passwords, and generates a JWT token.
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Remove password from the response
    const { password: _, ...adminWithoutPassword } = admin;

    // Send response
    res.status(200).json({
      message: "Admin logged in successfully.",
      token,
      admin: adminWithoutPassword,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Admin registration
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Remove password from response
    const { password: _, ...adminWithoutPassword } = newAdmin;

    res.status(201).json({
      message: "Admin registered successfully.",
      token,
      admin: adminWithoutPassword,
    });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
