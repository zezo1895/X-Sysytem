const express = require("express");
const router = express.Router();
const Auth = require("../models/authUser");
const json = require("express-json");
const bcrypt = require("bcrypt");
const checkAuth = require("../middleware/middleware");
const Authcon = require("../controllers/auth");
const Usercon = require("../controllers/user");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });
const { check, validationResult } = require("express-validator");


// test page
router.get("/", (req, res) => {
  res.send("Hello World!");
});
// login page
router.get("/api/login_page", Authcon.get_login);
// signup page
router.get("/api/signup_page", Authcon.get_signup);
// welcome page
router.get("/api/wel_page",Usercon.get_welcome );
// home page with midd
router.get("/api/home", checkAuth,Usercon.get_home );

// add page with midd
router.get("/api/add", checkAuth,Usercon.get_add );
// side with midd
router.get("/api/side", checkAuth, Usercon.get_side);


// log out with midd
router.get("/api/logout", checkAuth, Authcon.get_logout);
// view with midd
router.get("/api/home/view/:id", checkAuth,Usercon.get_view );
// edit with midd
router.get("/api/edit/:id", checkAuth,Usercon.get_edit );

// delete in home page  with midd
router.delete("/api/home/delete/:id", checkAuth,Usercon.delete_home_page );
// delete in edit page with midd
router.delete("/api/edit/:idd", checkAuth,Usercon.delete_edit_page );
// edit in  with midd
router.put("/api/edit/data/:iddd", checkAuth,Usercon.put_edit );
// post signup
router.post(
  "/api/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  Authcon.post_signup
);
// post login
router.post("/api/login", Authcon.post_login);
// post upload image
router.post("/api/upload", upload.single("file"), Usercon.post_image);
// post add data
router.post("/api/newCust", checkAuth,Usercon.post_add_data );
//serch
router.post("/api/home/search", checkAuth,Usercon.post_serch );

////middleware

module.exports = router;
