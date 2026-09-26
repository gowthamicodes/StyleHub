const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication failed",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }
console.log("Token type:", typeof token);
console.log("Token length:", token.length);
console.log("Starts with eyJ:", token.startsWith("eyJ"));
console.log("Contains spaces:", token.includes(" "));
console.log("Contains quotes:", token.includes('"'));
console.log("Parts:", token.split(".").map(part => part.length));
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      role: decodedToken.role,
    };

    next();
  } catch (err) {

     console.error("JWT ERROR:", err.name, err.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;