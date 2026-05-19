import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// POST /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    return res.status(201).json({
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      isAdmin: user.isAdmin,
      token:   generateToken(user._id),
    });

  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id:     user._id,
        name:    user.name,
        email:   user.email,
        //  isAdmin included so admin panel works after login
        isAdmin: user.isAdmin,
        token:   generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
    }

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/users/profile
export const getUserProfile = async (req, res) => {
  return res.json({
    _id:     req.user._id,
    name:    req.user.name,
    email:   req.user.email,
    isAdmin: req.user.isAdmin,
  });
};