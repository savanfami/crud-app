import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretkey = process.env.SECRET_KEY;

export const verfiyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token)
  if (!token) return res.status(401).json({ error: "access denied" });
  try {
    jwt.verify(token,secretkey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Failed to authenticate token" });
      }
      req.user = decoded; 
      next(); 
    });
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};


