const jwt = require("jsonwebtoken");
const { findUser } = require("../controllers/users");

module.exports = async function  (req, res, next) {
  let token = req.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized request" });

  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.substring(1, token.length - 1);
  }

  try {
    let payload = jwt.verify(token, "jwtKey");
    let user = await findUser(payload);
  
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token" });
  }
};
