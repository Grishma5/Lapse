const jwt = require("jsonwebtoken");
const User = require("../models/usermodel"); // Import the User model

// Load environment variables
require("dotenv").config();

const LoginUsers = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) { // Replace with bcrypt in production
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_TOKEN, { expiresIn: "1h" });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const createUsers = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const newUser = await User.create({ username, email, password, role });
        res.status(201).json({ success: true, message: "User Created", user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const Viewprofile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); // Assuming req.user is set by authGuard
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, profile: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const changepassword = async (req, res) => {
    const { newPassword } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.password = newPassword; // Replace with hashed password update in production
        await user.save();
        res.json({ success: true, message: "User password changed" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    createUsers,
    LoginUsers,
    Viewprofile,
    changepassword
};