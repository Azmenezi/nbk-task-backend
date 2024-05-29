const User = require("../../database/models/User");
const generateToken = require("../../utils/auth/generateToken");

exports.login = (req, res) => {
  try {
    // User is already authenticated by passport
    const token = generateToken(req.user);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Failed to log in." });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user." });
  }
};
