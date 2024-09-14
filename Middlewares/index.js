const JWT = require("jsonwebtoken");
const JWT_SECRET = "TATHVA@NITC";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Invalid authorization",
    });
  }
  const tokenSecret = token?.split(" ")[1];

  try {
    const response = JWT.verify(tokenSecret, JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({
      message: "Access Denied",
    });
  }
};

module.exports = authMiddleware;
