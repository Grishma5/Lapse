const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ data: { success: false, message: "No token provided" } });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded; // Store user ID from token
    next();
  } catch (error) {
    res.status(401).json({ data: { success: false, message: "Invalid token" } });
  }
};

const createUsers = async (req, res) => {
  console.log(req.body);
  console.log(req.files?.length ? req.files[0].path : null);
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.json({ data: { success: false, message: "please fill all fields" } });
    }
    const image = req.files?.length ? req.files[0].path : null;

    const UserExist = await User.findOne({ where: { username } });
    if (UserExist) {
      return res.status(409).json({ data: { success: false, message: "user already exists" } });
    }

    const EmailExist = await User.findOne({ where: { email } });
    if (EmailExist) {
      return res.status(409).json({ data: { success: false, message: "email already exists" } });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, email, password: hashedPassword, image });
    return res.status(201).json({ data: { success: true, message: "user created", user: { id: newUser.id, username, email, image } } });
  } catch (error) {
    res.status(400).json({ data: { success: false, message: error.message } });
  }
};

const updateUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const UserExist = await User.findByPk(userId);
    if (UserExist) {
      console.log("user exist");
      const { username, email, password, image } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = password ? await bcrypt.hash(password, salt) : UserExist.password;
      const [updatedRows, [updatedUser]] = await User.update(
        { username, email, password: hashedPassword, image },
        { where: { id: userId }, returning: true }
      );
      if (updatedRows > 0) {
        res.status(200).json({ data: { success: true, message: "user updated", user: updatedUser } });
      } else {
        res.status(400).json({ data: { success: false, message: "update failed" } });
      }
    } else {
      res.json({ data: { success: false, message: "user doesnt exist" } });
    }
  } catch (error) {
    res.status(400).json({ data: { success: false, message: error.message } });
  }
};

const getUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const UserExist = await User.findOne({ where: { id: userId } });
    if (UserExist) {
      res.json({ data: { success: true, user: UserExist } });
    } else {
      res.json({ data: { success: false, message: "user doesnt exist" } });
    }
  } catch (error) {
    res.status(400).json({ data: { success: false, message: error.message } });
  }
};

const deleteUsers = async (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id;
  try {
    const UserExist = await User.findByPk(userId);
    if (UserExist) {
      await User.destroy({ where: { id: userId } });
      res.status(200).json({ data: { success: true, message: "user deleted" } });
    } else {
      res.json({ data: { success: false, message: "user not found" } });
    }
  } catch (error) {
    res.status(400).json({ data: { success: false, message: error.message } });
  }
};

const getAllUsers = async (req, res) => {
  console.log(req.headers.authorization);
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json({ data: { success: true, users } });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ data: { success: false, message: "error fetching users" } });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ data: { success: false, message: "user not found" } });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ data: { success: false, message: 'Invalid credentials' } });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_TOKEN,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      data: { success: true, message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email, image: user.image } }
    });

    console.log(`User logged in: ${user.username} (ID: ${user.id}, Email: ${user.email}) at ${new Date().toISOString()}`);
  } catch (error) {
    res.status(400).json({ data: { success: false, message: error.message } });
  }
};

// New functions for profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ data: { success: false, message: 'User not found' } });
    }
    res.json({ data: { success: true, user: { id: user.id, username: user.username, email: user.email, profilePicture: user.image || '' } } });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ data: { success: false, message: 'Server error' } });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { username, email, profilePicture } = req.body;
    if (!username || !email) {
      return res.status(400).json({ data: { success: false, message: 'Name and email are required' } });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ data: { success: false, message: 'User not found' } });
    }

    const [updatedRows, [updatedUser]] = await User.update(
      { username, email, image: profilePicture },
      { where: { id: req.user.id }, returning: true }
    );

    if (updatedRows > 0) {
      res.json({ data: { success: true, user: { id: updatedUser.id, username: updatedUser.username, email: updatedUser.email, profilePicture: updatedUser.image || '' } } });
    } else {
      res.status(400).json({ data: { success: false, message: 'Update failed' } });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ data: { success: false, message: 'Server error' } });
  }
};

module.exports = {
  createUsers,
  updateUsers,
  deleteUsers,
  getAllUsers,
  getUsers,
  loginUser,
  getUserProfile,
  updateUserProfile,
};