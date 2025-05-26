// middleware/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Authentication failed" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userid = decoded.id; // Assuming the JWT payload has an 'id' field
    req.user = decoded; // Optional: for user details like name
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;