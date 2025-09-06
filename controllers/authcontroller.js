const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecretkey";

const users = [
  {
    id: 1,
    email: "test@example.com",
    password: bcrypt.hashSync("password123", 8),
    name: "Test User",
  }
];

exports.login = (req, res) => {
  const { email, password } = req.body;

  const foundUser = users.find((u) => u.email === email);
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const validPassword = bcrypt.compareSync(password, foundUser.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: foundUser.id, email: foundUser.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
    user: { id: foundUser.id, email: foundUser.email, name: foundUser.name },
  });
};

// Me endpoint
exports.me = (req, res) => {
  res.json({ user: req.user });
};