const userModel = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash");

exports.signup = async (req, res) => {
  try {
    console.log("Signup request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const user = await userModel.createUser(email, hashedPassword);

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("Signup Error FULL:", err);
    res.status(500).json({ error: err.message || "Unknown error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
