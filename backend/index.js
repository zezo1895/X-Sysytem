const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const port = 5000|| process.env.PORT;
const cors = require("cors");
const path = require("path");
require('dotenv').config()
app.use(express.static("public"));
const mongoose = require("mongoose");
const route = require("./routes/route");






mongoose
  .connect(
    process.env.MONGODB_URL,
  
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "https://x-sysytem-ziads-projects-f6c73ae6.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://x-sysytem-ziads-projects-f6c73ae6.vercel.app'); // للسماح لجميع النطاقات
  // أو لتحديد نطاق معين:
  // res.header('Access-Control-Allow-Origin', 'https://x-sysytem-ziads-projects-f6c73ae6.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(route);
