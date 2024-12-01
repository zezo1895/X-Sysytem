var jwt = require("jsonwebtoken");
const Auth = require("../models/authUser");


const checkAuth = async (req, res, next) => {
 const token = await  req.cookies.jwt;
  try {
    if (!token) {
      return res.json({ status: false });
    } else {
      const decoded = await jwt.verify(token, process.env.JWT_SECRETE_KEY);
      next();
    }
  } catch (error) {
    return res.json(err);
  }
};













module.exports=checkAuth;