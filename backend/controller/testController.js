const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  console.log('AuthMiddleware - Request headers:', req.headers.authorization); // Debug log
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ data: { success: false, message: "No token provided" } });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded; // Store user ID from token
    console.log('AuthMiddleware - Decoded user:', req.user); // Debug log
    next();
  } catch (error) {
    console.error('AuthMiddleware error:', error);
    res.status(401).json({ data: { success: false, message: "Invalid token" } });
  }
};

const createUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ data: { success: false, message: "Please fill all fields" } });
    }

    const image = req.file ? req.file.path : null; // Single file for registration
    console.log('CreateUsers - Image path:', image); // Debug log
    console.log('CreateUsers - Request body:', req.body); // Debug log

    const UserExist = await User.findOne({ where: { username } });
    if (UserExist) {
      return res.status(409).json({ data: { success: false, message: "User already exists" } });
    }

    const EmailExist = await User.findOne({ where: { email } });
    if (EmailExist) {
      return res.status(409).json({ data: { success: false, message: "Email already exists" } });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, email, password: hashedPassword, image });
    
    const response = {
      data: {
        success: true,
        message: "User created",
        user: { id: newUser.id, username, email, image: newUser.image || '' },
      },
    };
    console.log('CreateUsers - Response:', response); // Debug log
    return res.status(201).json(response);
  } catch (error) {
    console.error('CreateUsers error:', error); // Debug log
    res.status(400).json({ data: { success: false, message: error.message } });
  }
};

const updateUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const UserExist = await User.findByPk(userId);
    if (!UserExist) {
      return res.status(404).json({ data: { success: false, message: "User doesn't exist" } });
    }

    const { username, email, password } = req.body;
    const image = req.file ? req.file.path : UserExist.image;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = password ? await bcrypt.hash(password, salt) : UserExist.password;

    const [updatedRows] = await User.update(
      { username, email, password: hashedPassword, image },
      { where: { id: userId } }
    );

    if (updatedRows > 0) {
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({
        data: {
          success: true,
          message: "User updated",
          user: updatedUser,
        },
      });
    } else {
      res.status(400).json({
        data: { success: false, message: "Update failed" },
      });
    }
  } catch (error) {
    res.status(400).json({
      data: { success: false, message: error.message },
    });
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

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ data: { success: false, message: 'User not found' } });
    }
    // Ensure image is included and handle null case
    res.json({ data: { success: true, user: { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      image: user.image || '' 
    } } });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ data: { success: false, message: 'Server error' } });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    console.log('UpdateProfile - Raw request:', req); // Debug raw request object
    const userId = req.user.id;
    const { name, email } = req.body || {}; // Initialize variables
    const imageFile = req.file ? req.file : null; // Use req.file for single file upload

    // Debug logs
    console.log('UpdateProfile - Request body:', req.body);
    console.log('UpdateProfile - Uploaded file:', imageFile ? imageFile.path : 'No file');
    console.log('UpdateProfile - Headers:', req.headers); // Debug headers

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ data: { success: false, message: "User not found" } });
    }

    const updateData = {};
    if (name && name.trim() !== user.username) updateData.username = name.trim();
    if (email && email.trim() !== user.email) updateData.email = email.trim();
    if (imageFile) {
      updateData.image = imageFile.path; // Store the full path
      console.log(`UpdateProfile - Updating image to: ${imageFile.path}`);
    }

    // Check if there are any updates
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ data: { success: false, message: "No updates provided" } });
    }

    const [affectedRows] = await User.update(updateData, { where: { id: userId } });
    if (affectedRows === 0) {
      console.log('UpdateProfile - No rows updated');
      return res.status(400).json({ data: { success: false, message: "Update failed" } });
    }

    const updatedUser = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    const response = {
      data: {
        success: true,
        message: "Profile updated",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          image: updatedUser.image || '',
        },
      },
    };
    console.log('UpdateProfile - Response:', response);
    res.json(response);
  } catch (error) {
    console.error('UpdateProfile error:', error);
    res.status(500).json({ data: { success: false, message: error.message || "Server error" } });
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