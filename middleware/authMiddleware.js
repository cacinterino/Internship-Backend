const jwt = require("jsonwebtoken");
const JWT_SECRET = "supersecretkey";

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Expect: Authorization: Bearer <token>
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Token Missing" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded; // decoded payload (id, email, iat, exp)
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};