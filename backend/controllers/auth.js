const Auth = require("../models/authUser");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");




//  get login page 

const get_login =async (req, res) => {
  const token = await req.cookies.jwt;
  if(token){
    return res.json({auth:true})
  }
  else{return res.json({auth:false})}
}
//  post login page 
const post_login = async (req, res) => {
  try {
    const loginUser = await Auth.findOne({ email: req.body.email });
    if (loginUser == null) {
      console.log("the email is invaild");
      res.json({ emailerr: "this email don't have account" });
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);
      if (match) {
        var token = await jwt.sign({ id: loginUser._id }, process.env.JWT_SECRETE_KEY);
        
        res.cookie("jwt", token, {
          domain:"https://x-sysytem-ziads-projects-f6c73ae6.vercel.app",
          withCrdentials: true,
          secure:true,
          sameSite:'Strict',
          httpOnly: true,
          maxAge: 86500000,
        });

        res.status(201).json({ user: loginUser._id, created: true, token });
      } else {
        res.json({ passerr: "Wrong Password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
//  get signup page 
const get_signup =async (req, res) => {
  const token =await req.cookies.jwt;
  if(token){
    return res.json({auth:true})
  }
  else{return res.json({auth:false})}
}
//  post login page 
const post_signup =   async (req, res) => {
  try {
    const objError =await validationResult(req);
    console.log(objError.errors);

    if (objError.errors.length > 0) {
      return res.json({ vaildErr: objError });
    }

    const auth = await Auth.findOne({ email: req.body.email });
    if (auth) {
      res.json({ used: "this Email already used" });
    } else {
      const result = await Auth.create(req.body);
      var token =await jwt.sign({ id: result._id }, process.env.JWT_SECRETE_KEY);
      res.cookie("jwt", token, {
        withCrdentials: true,
        secure:true,
          sameSite:'Strict',
          httpOnly: true,
        maxAge: 86500000,
      });
      res.status(201).json({ user: result._id, created: true, status: true });

      // res.json({signup:"right"})
      // console.log(token);
    }
  } catch (error) {
    console.log(error);
  }
}

//  get log out 
const get_logout =async (req, res) => {
await  res.clearCookie("jwt",{withCrdentials: true,

  sameSite:'Strict',
    httpOnly: true});
    res.end()
  return res.json({ status: true });
}















module.exports = {
  get_login,post_login,get_signup,post_signup,get_logout 
};
